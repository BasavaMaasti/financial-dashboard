'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts'

interface SIPChartProps {
  data: any[]
  isLoading: boolean
  isDarkMode: boolean
}

const SIPChart = ({ data, isLoading, isDarkMode }: SIPChartProps) => {
  if (isLoading) {
    return (
      <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    )
  }

  // Sample data if no data provided
  const chartData = data || [
    { name: 'Jan', value: 400, lineValue: 240 },
    { name: 'Feb', value: 300, lineValue: 398 },
    { name: 'Mar', value: 200, lineValue: 400 },
    { name: 'Apr', value: 278, lineValue: 404 },
    { name: 'May', value: 189, lineValue: 410 },
    { name: 'Jun', value: 239, lineValue: 412 },
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4B5563' : '#E5E7EB'} />
        <XAxis 
          dataKey="name" 
          stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
        />
        <YAxis 
          stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: isDarkMode ? '#374151' : '#FFF',
            borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
            color: isDarkMode ? '#F3F4F6' : '#374151'
          }}
        />
        <Bar dataKey="value" fill={isDarkMode ? '#60A5FA' : '#3B82F6'} />
        <Line 
          type="monotone" 
          dataKey="lineValue" 
          stroke={isDarkMode ? '#FBBF24' : '#F59E0B'} 
          strokeWidth={2} 
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default SIPChart