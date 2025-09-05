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
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const result = await fetchDashboardData(timeRange)
      setData(result)
      setIsLoading(false)
    }
    loadData()
  }, [timeRange])

  const handleExportPDF = () => {
    exportToPDF('dashboard-content', 'financial-dashboard-report')
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div id="dashboard-content" className={`p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Financial Dashboard</h1>
          <button 
            onClick={handleExportPDF}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>

        <MainCards data={data} isLoading={isLoading} />
        <FilterBar timeRange={timeRange} setTimeRange={setTimeRange} />
        <StatCards data={data} isLoading={isLoading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-lg font-semibold mb-4">Clients</h2>
            <ClientsChart data={data?.clientsData} isLoading={isLoading} isDarkMode={isDarkMode} />
          </div>
          
          <div className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-lg font-semibold mb-4">SIP Business</h2>
            <SIPChart data={data?.sipData} isLoading={isLoading} isDarkMode={isDarkMode} />
          </div>
        </div>
        
        <div className={`mt-6 p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-lg font-semibold mb-4">Monthly MIS</h2>
          <MonthlyMISChart data={data?.misData} isLoading={isLoading} isDarkMode={isDarkMode} />
        </div>
      </div>
    </Layout>
  )
}
