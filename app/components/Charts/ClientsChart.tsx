'use client'

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ClientsChartProps {
  data: any[]
  isLoading: boolean
  isDarkMode?: boolean
}

const ClientsChart = ({ data, isLoading, isDarkMode = false }: ClientsChartProps) => {
  if (isLoading) {
    return (
      <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    )
  }

  // Sample data if no data provided
  const chartData = data || [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4B5563' : '#E5E7EB'} />
        <XAxis 
          type="number" 
          dataKey="x" 
          name="Clients" 
          stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
        />
        <YAxis 
          type="number" 
          dataKey="y" 
          name="Value" 
          stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
        />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }} 
          contentStyle={{ 
            backgroundColor: isDarkMode ? '#374151' : '#FFF',
            borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
            color: isDarkMode ? '#F3F4F6' : '#374151'
          }}
        />
        <Scatter name="Clients" data={chartData} fill={isDarkMode ? '#60A5FA' : '#3B82F6'} />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default ClientsChart