import React from 'react'
import Image from 'next/image'

const products = [
  { name: 'Coconut Oil', description: 'Pure and natural coconut oil for cooking and skin care.' },
  { name: 'Sesame Oil', description: 'Rich, nutty sesame oil perfect for Asian cuisine.' },
  { name: 'Ground Nut Oil', description: 'High-quality groundnut oil for versatile cooking applications.' },
  { name: 'Sago', description: 'Traditional sago (javu arusi) for delicious desserts and snacks.' },
]

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Our Products</h1>
        <p className="mt-4 text-gray-500">
          Explore our range of premium agro products, carefully sourced and processed to ensure the highest quality.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.name} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <Image
                  src={`/placeholder.svg?height=300&width=300`}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

