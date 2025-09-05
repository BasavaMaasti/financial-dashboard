interface MainCardsProps {
  data: any
  isLoading: boolean
}

const MainCards = ({ data, isLoading }: MainCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">AUM</h3>
        <div className="flex items-end mb-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ₹{data?.aum?.value?.toLocaleString('en-IN')}
          </span>
          <span className={`ml-2 text-sm font-semibold ${data?.aum?.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data?.aum?.change >= 0 ? '↑' : '↓'} {Math.abs(data?.aum?.change)}% MoM
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Total Assets Under Management</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          View Report
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">SIP</h3>
        <div className="flex items-end mb-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ₹{data?.sip?.value?.toLocaleString('en-IN')}
          </span>
          <span className={`ml-2 text-sm font-semibold ${data?.sip?.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data?.sip?.change >= 0 ? '↑' : '↓'} {Math.abs(data?.sip?.change)}% MoM
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Systematic Investment Plan</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          View Report
        </button>
      </div>
    </div>
  )
}

export default MainCards