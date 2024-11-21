import React, { useState } from 'react'
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom'
import { BsCartFill } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/UserSlice'
import { toast } from 'react-hot-toast'


const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false);

    const userData = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleShowMenu = () => {
        setShowMenu(preview => !preview)
    }

    const handleLogout = () => {
        dispatch(logoutRedux())
        toast("Logout Successfully")
    };

    const cartItemNumber = useSelector((state)=>state.product.cartItem)

    return (
        
        <div className='fixed shadow-md w-full h-24 pr-6 z-50 bg-white'>
            <div className='flex flex-center h-full justify-between'>
                <Link to={" "}>
                    <div className="h-24">
                        <img src={logo} alt="logo" className='h-full' />
                    </div>
                </Link>
                
                <div className="flex items-center gap-4 xl:gap-7 lg:gap-7">
                    <nav className='gap-4 xl:gap-6 lg:gap-6 text-base xl:text-lg  lg:text-md  xl:flex lg:flex md:flex hidden'>
                        <Link to={""}>Home</Link>
                        <Link to={"menu"}>Menu</Link>
                    </nav>
                    <div className="text-3xl text-slate-600 relative ">
                        <Link to={"cart"}>
                            <BsCartFill />
                            <div className="absolute top-0 right-0 text-white bg-red-500 h-4 w-4 text-xs text-center rounded-full">
                                {cartItemNumber.length}
                            </div>
                        </Link> 
                    </div>
                    <div className=" text-slate-600" onClick={handleShowMenu}>
                        <div className='text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md'>
                            {
                                userData.image ? <img src={userData.image} alt='profile pic' className='h-full w-full' /> : <FaRegUserCircle />
                            }
                        </div>
                        {showMenu && (
                            <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col text-center">
                                {
                                    userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={'uploadproduct'} className='whitespace-nowrap cursor-pointer hover:bg-orange-500 px-6 py-1'>Add Product</Link>
                                }
                                {
                                    userData.image ? <p className='cursor-pointer hover:bg-orange-500 px-6' onClick={handleLogout}>Logout ({userData.firstName}) </p> : <Link to={'Login'} className='whitespace-nowrap cursor-pointer hover:bg-orange-500 px-6 py-1'>Login</Link>
                                }

                                <nav className='flex flex-col xl:hidden lg:hidden md:hidden'>
                                    <Link to={""} className='whitespace-nowrap cursor-pointer hover:bg-orange-500 px-6 py-1'>Home</Link>
                                    <Link to={"menu"} className='whitespace-nowrap cursor-pointer hover:bg-orange-500 px-6 py-1'>Menu</Link>
                                    <Link to={"contact"} className='whitespace-nowrap cursor-pointer hover:bg-orange-500 px-6 py-1'>Contact</Link>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar