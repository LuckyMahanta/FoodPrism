import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Cancel = () => {
  React.useEffect(() => {
    toast.error("Payment was cancelled");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-6 rounded-md shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-500">Payment Cancelled</h1>
        <p className="mt-4 text-lg text-gray-600">Your payment was cancelled.</p>
        <p className="mt-2 text-gray-500">Your cart items are still saved.</p>

        <div className="mt-6 space-y-4">
          <Link to="/cart" className="block text-blue-500 hover:underline">
            Return to Cart
          </Link>
          <Link to="/" className="block text-blue-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;