import React from 'react'
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-500">Payment Canceled</h1>
        <p className="mt-4 text-lg text-gray-600">It looks like you canceled the payment.</p>
        <p className="mt-2 text-gray-500">If you have any issues or questions, feel free to contact our support team.</p>
        
        <div className="mt-6">
          <Link to="/" className="text-blue-500 hover:underline">
            Go back to Home
          </Link>
        </div>
        <div className="mt-2">
          <Link to="/cart" className="text-blue-500 hover:underline">
            Return to Cart
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cancel
