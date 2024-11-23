import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/ProductSlide';
import { toast } from 'react-hot-toast';

const Success = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndClearCart = async () => {
        if (!user?._id) {
            toast.error("Please login to continue");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user._id }),
            });

            const data = await response.json();

            if (data.success) {
                // Clear both Redux state and session storage
                dispatch(clearCart());
                sessionStorage.removeItem('cartState');
                toast.success("Payment successful! ");
            } else {
                toast.error("Payment verification failed");
                navigate('/cart');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            toast.error("Error processing payment confirmation");
            navigate('/cart');
        }
    };

    verifyAndClearCart();
}, [user, dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
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
  );
};

export default Success;