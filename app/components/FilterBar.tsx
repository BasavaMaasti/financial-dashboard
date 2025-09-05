interface FilterBarProps {
  timeRange: string
  setTimeRange: (range: string) => void
}

const FilterBar = ({ timeRange, setTimeRange }: FilterBarProps) => {
  const timeRanges = ['3D', '7D', '10D', '30D']
  
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-blue-600">Performance Overview</h2>
      <div className="flex space-x-2">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === range 
                ? 'bg-blue-500 text-white' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar