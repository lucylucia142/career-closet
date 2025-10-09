import React from 'react'
import Hero from '../COMPONENTS/Hero.jsx'
import LatestCollection from '../COMPONENTS/LatestCollection.jsx'
import BestSeller from '../COMPONENTS/BestSeller.jsx'
import OurPolicy from '../COMPONENTS/OurPolicy.jsx'
import NewsletterBox from '../COMPONENTS/NewsletterBox.jsx'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home
