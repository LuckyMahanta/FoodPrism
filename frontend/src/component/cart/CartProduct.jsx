import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteCartItem, increaseQty, decreaseQty } from '../redux/ProductSlide';

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch();

  const handleDeleteCartProduct = () => {
    dispatch(deleteCartItem({ id }));
  };

  const handleIncreaseCartProduct = () => {
    dispatch(increaseQty({ id }));
  };

  const handleDecreaseCartProduct = () => {
    if (qty > 1) {
      dispatch(decreaseQty({ id }));
    }
  };

  return (
    <div className='bg-slate-200 p-2 flex gap-4 rounded border border-slate-300 hover:shadow-2xl drop-shadow max-h-full overflow-y-auto'>
    <div className='bg-white p-3 rounded overflow-hidden'>
      <img src={image} className='h-28 w-36 object-cover' alt={name} />
    </div>
    <div className='flex flex-col gap-1 flex-grow relative'>
      <h3 className='font-semibold text-slate-600 capitalize text-2xl md:text-4xl'>
        {name}
      </h3>
      <div className='absolute top-0 right-0 text-3xl cursor-pointer hover:text-red-600' onClick={handleDeleteCartProduct}>
        <MdDeleteForever />
      </div>
      <p className='text-slate-500 capitalize font-medium'>{category}</p>
      <p className='font-bold'>
        <span className='text-red-400'>&#8377;</span> {price}
      </p>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center'>
          <button className='bg-slate-300 w-7 h-7 rounded hover:bg-slate-400' onClick={handleDecreaseCartProduct}>-</button>
          <p className='font-semibold p-1'>{qty}</p>
          <button className='bg-slate-300 w-7 h-7 rounded hover:bg-slate-400' onClick={handleIncreaseCartProduct}>+</button>
        </div>
        <div className='flex items-end ml-auto px-2 font-bold text-slate-600'>
          <p>Total: <span className='text-red-400'>&#8377;</span>{total}</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CartProduct;
