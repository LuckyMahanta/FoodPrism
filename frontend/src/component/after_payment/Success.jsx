import React from 'react'
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="p-6 rounded-md shadow-md text-center hover:shadow-xl drop-shadow">
        <h1 className="text-3xl font-bold text-green-500">Payment Successful!</h1>
        <p className="mt-4 text-lg text-gray-600">Thank you for your purchase.</p>
        <p className="mt-2 text-gray-500">Your order is being processed and will be shipped soon.</p>

        <div className="mt-6">
          <Link to="/" className="text-blue-500 hover:underline">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Success
