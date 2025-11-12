import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  const [latestProduct, setLatestProduct] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products')
        const data = await response.json()

        // Sort products by date (if createdAt exists) or just take the last added
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setLatestProduct(sorted[0]) // use most recent product
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  if (!latestProduct) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-600">Loading latest arrivals...</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 mx-4 sm:mx-8 lg:mx-16 xl:mx-24'>
      {/* Left Section */}
      <div className='w-full sm:w-1/2 flex items-center justify-start px-8 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20'>
        <div className='text-[#414141] max-w-md'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 sm:w-12 h-[2px] bg-[#414141]'></div>
            <p className='font-medium text-xs sm:text-sm tracking-wider'>OUR BESTSELLER</p>
          </div>
          <h1 className='prata-regular text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-8 text-gray-900'>
            {latestProduct.name || 'Latest Arrivals'}
          </h1>
          <p className='text-gray-700 mb-8 text-sm sm:text-base'>
            {latestProduct.description?.slice(0, 100) || 'Explore our latest collection of stylish workwear.'}
          </p>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => navigate(`/product/${latestProduct._id}`)}
              className='font-semibold text-sm sm:text-base cursor-pointer hover:underline tracking-wide'
            >
              SHOP NOW
            </button>
            <div className='w-10 sm:w-12 h-[2px] bg-[#414141]'></div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className='w-full sm:w-1/2 relative overflow-hidden'>
        <img 
          className='w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] object-cover object-center' 
          src={latestProduct.image || 'https://via.placeholder.com/600x800?text=No+Image'} 
          alt={latestProduct.name || 'Product'} 
        />
      </div>
    </div>
  )
}

export default Hero
