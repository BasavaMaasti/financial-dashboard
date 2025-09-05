// Mock API functions
export const fetchDashboardData = async (timeRange: string = '7D') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock data based on time range
  const getRandomValue = (base: number, variance: number) => 
    base + (Math.random() * variance * 2 - variance);
  
  return {
    aum: {
      value: getRandomValue(12500000, 500000),
      change: getRandomValue(2.5, 0.5)
    },
    sip: {
      value: getRandomValue(2500000, 100000),
      change: getRandomValue(1.8, 0.3)
    },
    purchases: Math.round(getRandomValue(2450, 100)),
    purchasesChange: getRandomValue(5.2, 1.2),
    redemptions: Math.round(getRandomValue(1850, 80)),
    redemptionsChange: getRandomValue(-2.3, 0.8),
    rejected: Math.round(getRandomValue(120, 20)),
    rejectedChange: getRandomValue(-1.5, 0.5),
    sipRejections: Math.round(getRandomValue(85, 15)),
    sipRejectionsChange: getRandomValue(0.8, 0.3),
    newSip: Math.round(getRandomValue(350, 50)),
    newSipChange: getRandomValue(3.7, 1.1),
    clientsData: [
      { x: getRandomValue(100, 30), y: getRandomValue(200, 50), z: getRandomValue(200, 40) },
      { x: getRandomValue(120, 30), y: getRandomValue(100, 30), z: getRandomValue(260, 50) },
      { x: getRandomValue(170, 40), y: getRandomValue(300, 60), z: getRandomValue(400, 80) },
      { x: getRandomValue(140, 30), y: getRandomValue(250, 50), z: getRandomValue(280, 60) },
      { x: getRandomValue(150, 30), y: getRandomValue(400, 80), z: getRandomValue(500, 100) },
      { x: getRandomValue(110, 20), y: getRandomValue(280, 50), z: getRandomValue(200, 40) },
    ],
    sipData: [
      { name: 'Jan', value: getRandomValue(400, 50), lineValue: getRandomValue(240, 30) },
      { name: 'Feb', value: getRandomValue(300, 40), lineValue: getRandomValue(398, 40) },
      { name: 'Mar', value: getRandomValue(200, 30), lineValue: getRandomValue(400, 50) },
      { name: 'Apr', value: getRandomValue(278, 40), lineValue: getRandomValue(404, 40) },
      { name: 'May', value: getRandomValue(189, 30), lineValue: getRandomValue(410, 50) },
      { name: 'Jun', value: getRandomValue(239, 40), lineValue: getRandomValue(412, 40) },
    ],
    misData: [
      { name: 'Jan', sales: getRandomValue(4000, 500), revenue: getRandomValue(2400, 300), profit: getRandomValue(2400, 300) },
      { name: 'Feb', sales: getRandomValue(3000, 400), revenue: getRandomValue(1398, 200), profit: getRandomValue(2210, 300) },
      { name: 'Mar', sales: getRandomValue(2000, 300), revenue: getRandomValue(9800, 1000), profit: getRandomValue(2290, 300) },
      { name: 'Apr', sales: getRandomValue(2780, 400), revenue: getRandomValue(3908, 500), profit: getRandomValue(2000, 300) },
      { name: 'May', sales: getRandomValue(1890, 300), revenue: getRandomValue(4800, 600), profit: getRandomValue(2181, 300) },
      { name: 'Jun', sales: getRandomValue(2390, 400), revenue: getRandomValue(3800, 500), profit: getRandomValue(2500, 400) },
      { name: 'Jul', sales: getRandomValue(3490, 500), revenue: getRandomValue(4300, 600), profit: getRandomValue(2100, 300) },
    ]
  };
};