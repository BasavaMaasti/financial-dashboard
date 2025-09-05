'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface MonthlyMISChartProps {
  data: any[]
  isLoading: boolean
  isDarkMode: boolean
}

const MonthlyMISChart = ({ data, isLoading, isDarkMode }: MonthlyMISChartProps) => {
  if (isLoading) {
    return (
      <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    )
  }

  // Sample data if no data provided
  const chartData = data || [
    { name: 'Jan', sales: 4000, revenue: 2400, profit: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398, profit: 2210 },
    { name: 'Mar', sales: 2000, revenue: 9800, profit: 2290 },
    { name: 'Apr', sales: 2780, revenue: 3908, profit: 2000 },
    { name: 'May', sales: 1890, revenue: 4800, profit: 2181 },
    { name: 'Jun', sales: 2390, revenue: 3800, profit: 2500 },
    { name: 'Jul', sales: 3490, revenue: 4300, profit: 2100 },
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
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
        <Legend />
        <Line 
          type="monotone" 
          dataKey="sales" 
          stroke={isDarkMode ? '#60A5FA' : '#3B82F6'} 
          strokeWidth={2} 
          activeDot={{ r: 8 }} 
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke={isDarkMode ? '#FBBF24' : '#F59E0B'} 
          strokeWidth={2} 
        />
        <Line 
          type="monotone" 
          dataKey="profit" 
          stroke={isDarkMode ? '#34D399' : '#10B981'} 
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default MonthlyMISChart