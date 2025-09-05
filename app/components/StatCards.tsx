interface StatCardsProps {
  data: any
  isLoading: boolean
}

const StatCards = ({ data, isLoading }: StatCardsProps) => {
  const stats = [
    { title: 'Purchases', value: data?.purchases, change: data?.purchasesChange },
    { title: 'Redemptions', value: data?.redemptions, change: data?.redemptionsChange },
    { title: 'Rejected Transactions', value: data?.rejected, change: data?.rejectedChange },
    { title: 'SIP Rejections', value: data?.sipRejections, change: data?.sipRejectionsChange },
    { title: 'New SIP', value: data?.newSip, change: data?.newSipChange },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</h3>
          <div className="flex items-end">
            <span className="text-xl font-bold text-gray-900 dark:text-white mr-2">
              {typeof stat.value === 'number' ? stat.value.toLocaleString('en-IN') : stat.value}
            </span>
            <span className={`text-xs font-semibold ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Since last month</p>
        </div>
      ))}
    </div>
  )
}

export default StatCards