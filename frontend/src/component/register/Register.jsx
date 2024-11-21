import React, { useState } from 'react'
import LoginSignupImage from '../../images/login-animation.gif'
import { BiShowAlt, BiHide } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { ImageConverter } from '../utility/ImageConverter';
import { toast } from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [ShowPassword, SetShowPassword] = useState(false);
    const [ShowConfirmPassword, SetShowConfirmPassword] = useState(false);
    const [data, SetData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: '',
    });
    console.log(data)
    const handleShowPassword = () => {
        SetShowPassword(previous => !previous)
    };

    const handleShowConfirmPassword = () => {
        SetShowConfirmPassword(previous => !previous)
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target
        SetData((previous) => {
            return {
                ...previous,
                [name]: value
            }
        })

    }

    const handleUploadProfileImage = async (e) => {

        if (!e.target.files || e.target.files.length === 0) {
            console.error('No file selected');
            return;
        }

        const data = await ImageConverter(e.target.files[0])
        console.log(data)

        SetData((previous) => {
            return {
                ...previous,
                image: data
            }
        })
    }

    console.log(process.env.REACT_APP_SERVER_DOMAIN)
    const handleSubmit = async (e) => {
        e.preventDefault()

        const { firstName, email, password, confirmPassword } = data

        if (firstName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/register`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json "
                    },
                    body: JSON.stringify(data)
                })

                const dataResult = await fetchData.json()
                console.log(dataResult)
                toast(dataResult.message)

                if (dataResult.alert) {
                    navigate('/login')
                }
            }
            else {
                toast.error("Password and Confirm Password do not match")
            }
        }
        else {
            alert("Please enter required fields")
        }
    }
    return (
        <div className="pt-24 ">
            <div className="px-8 p-4 md:p-10 ">
                <div className='w-full max-w-sm bg-white m-auto flex flex-col px-6 p-4 '>
                    <h1 className='text-center text-2xl font-bold'>
                        Register
                    </h1>
                    <div className="w-20 h-20 overflow-hidden drop-shadow-md shadow-md rounded-full relative m-auto">
                        <img src={data.image ? data.image : LoginSignupImage} alt="Register Profile" className='w-full h-full' />

                        <label htmlFor='profileImage'>
                            <div className='absolute bottom-0 w-full text-center h-1/3 bg-slate-400 bg-opacity-40 cursor-pointer'>
                                <p className='text-sm p-1 text-white'>Upload</p>
                            </div>
                            <input type='file' id='profileImage' accept='image/*' className='hidden' onChange={handleUploadProfileImage} required />
                        </label>
                    </div>

                    <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' id='firstName' name='firstName' className='mt-1 mb-4 w-full bg-slate-200 px-2 py-1 rounded-md focus-within:outline-blue-500' value={data.firstName} onChange={handleOnChange} required />

                        <label htmlFor='lastName'>Last Name</label>
                        <input type='text' id='lastName' name='lastName' className='mt-1 mb-4 w-full bg-slate-200 px-2 py-1 rounded-md focus-within:outline-blue-500' value={data.lastName} onChange={handleOnChange} required />

                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' className='mt-1 mb-4 w-full bg-slate-200 px-2 py-1 rounded-md focus-within:outline-blue-500' value={data.email} onChange={handleOnChange} required />

                        <label htmlFor='password'>Password</label>
                        <div className='flex px-2 py-1 mt-1 mb-4  bg-slate-200  rounded-md focus-within:outline focus-within:outline-blue-500'>
                            <input type={ShowPassword ? 'text' : 'password'} id='password' name='password' className=' w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange} required />
                            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{ShowPassword ? <BiShowAlt /> : <BiHide />}</span>
                        </div>

                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <div className='flex px-2 py-1 mt-1 mb-4  bg-slate-200  rounded-md focus-within:outline focus-within:outline-blue-500'>
                            <input type={ShowConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' className=' w-full bg-slate-200 border-none outline-none' value={data.confirmPassword} onChange={handleOnChange} required />
                            <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{ShowConfirmPassword ? <BiShowAlt /> : <BiHide />}</span>
                        </div>

                        <button type='submit' className='max-w-[150px] w-full m-auto bg-orange-500 hover:bg-orange-600 text-white text-xl font-medium text-center py-1 rounded-full mt-2'>Register</button>
                    </form>
                    <p>Already have an account? <Link to={"/login"} className='hover:font-medium text-orange-700 underline'>Login</Link></p>
                </div>
            </div>

        </div>
    )
}

export default Register
