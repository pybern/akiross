import React from 'react'
import Heading from '../components/Heading'
import TestTables from '../components/TestTables'

import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/fakeData', {
        method: 'POST',
        body: JSON.stringify({
          limit: 20,
        }),
      })
      return response.json()
    }

    fetchData().then((data) => {
      setData(data)
    })
  }, [])


  return (
    <div>
      <Heading title = 'Bookings'/>
      {!data ? <div className="mt-6 px-4 sm:px-6 lg:px-8">Loading...</div> : 
      <TestTables data={data} />}
      
    </div>
  )
}
