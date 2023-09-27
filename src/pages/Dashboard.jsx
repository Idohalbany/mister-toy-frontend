import { ToyChart } from '../cmps/ToyChart'

export function Dashboard() {
  const randomData = [
    { title: 'New Users', value: Math.floor(Math.random() * 1000) },
    { title: 'Active Sessions', value: Math.floor(Math.random() * 200) },
    { title: 'Total Sales', value: `$${Math.floor(Math.random() * 10000)}` },
  ]

  return (
    <section className='dashboard-section'>
      <h1>Dashboard</h1>
      <div className='dashboard-stats'>
        {randomData.map((data, idx) => (
          <div key={idx} className='dashboard-stat-card'>
            <h3>{data.title}</h3>
            <p>{data.value}</p>
          </div>
        ))}
      </div>
      <ToyChart />
    </section>
  )
}
