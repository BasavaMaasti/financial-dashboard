'use client'

import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import MainCards from './components/MainCards'
import FilterBar from './components/FilterBar'
import StatCards from './components/StatCards'
import ClientsChart from './components/Charts/ClientsChart'
import SIPChart from './components/Charts/SIPChart'
import MonthlyMISChart from './components/Charts/MonthlyMISChart'
import { fetchDashboardData } from './lib/api'
import { exportToPDF } from './lib/pdf-export'

export default function Home() {
  const [data, setData] = useState<any>(null)
  const [timeRange, setTimeRange] = useState('7D')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const timeFilter = timeRange.replace('D', '')
        const result = await fetchDashboardData(timeFilter)
        
        if (result.success && result.data) {
          setData(result.data)
        } else {
          setError(result.error || 'Failed to load data')
        }
      } catch (err) {
        setError('Network error occurred')
      }
      
      setIsLoading(false)
    }
    
    loadData()
  }, [timeRange])

  const handleExportPDF = () => {
    if (data) {
      exportToPDF('dashboard-content', 'financial-dashboard-report')
    } else {
      alert('Please wait for data to load before exporting')
    }
  }

  if (isLoading) {
    return (
      <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="text-red-500 text-center">
            <p className="text-lg font-semibold">Error Loading Dashboard</p>
            <p className="text-sm text-gray-500 mt-2">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <p className="text-gray-600 dark:text-gray-400">No data available</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
      <div id="dashboard-content" className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Financial Dashboard
          </h1>
          {/* Only PDF Export button - Dark mode toggle is in Navbar */}
          <button 
            onClick={handleExportPDF}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>

        <MainCards data={data.mainCards} isLoading={isLoading} />
        <FilterBar timeRange={timeRange} setTimeRange={setTimeRange} />
        <StatCards data={data.statCards} isLoading={isLoading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Clients Distribution
            </h2>
            <ClientsChart 
              data={data.clientsData} 
              isLoading={isLoading} 
              isDarkMode={isDarkMode} 
            />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              SIP Business Trends
            </h2>
            <SIPChart 
              data={data.sipBusinessData} 
              isLoading={isLoading} 
              isDarkMode={isDarkMode} 
            />
          </div>
        </div>
        
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Monthly MIS Report
          </h2>
          <MonthlyMISChart 
            data={data.monthlyMisData} 
            isLoading={isLoading} 
            isDarkMode={isDarkMode} 
          />
        </div>
      </div>
    </Layout>
  )
}