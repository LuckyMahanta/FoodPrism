import React, { useState } from 'react'
import LoginSignupImage from '../../images/login-animation.gif'
import { BiShowAlt, BiHide } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { loginRedux } from '../redux/UserSlice';

const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [ShowPassword, SetShowPassword] = useState(false);
    const [data, SetData] = useState({
        email: '',
        password: '',
    });
    
    const handleShowPassword = () => {
        SetShowPassword(previous => !previous)
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { email, password } = data

        if (email && password) {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json "
                },
                body: JSON.stringify(data)
            })

            const dataResult = await fetchData.json()
            console.log(dataResult)
            toast.success(dataResult.message)

            if (dataResult.alert) {
                dispatch(loginRedux(dataResult))
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
        }
        else {
            toast("Please enter required fields")
        }
    }

    return (
        <div className="pt-24 ">
            <div className="flex flex-row justify-center px-8 p-4 md:p-10 ">
                <div className='w-full max-w-sm bg-white m-auto flex flex-col px-6 p-4 rounded-xl'>
                    <h1 className='text-center text-2xl font-bold'>
                        Login
                    </h1>
                    <div className="w-20 oveflow-hidden drop-shadow-md m-auto">
                        <img src={LoginSignupImage} alt="Register Profile" className='w-full rounded-full shadow-md ' />
                    </div>

                    <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' className='mt-1 mb-4 w-full bg-slate-200 px-2 py-1 rounded-md focus-within:outline-blue-500' value={data.email} onChange={handleOnChange} />

                        <label htmlFor='password'>Password</label>
                        <div className='flex px-2 py-1 mt-1 mb-4  bg-slate-200  rounded-md focus-within:outline focus-within:outline-blue-500'>
                            <input type={ShowPassword ? 'text' : 'password'} id='password' name='password' className=' w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange} />
                            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{ShowPassword ? <BiShowAlt /> : <BiHide />}</span>
                        </div>

                        <button type='submit' className='max-w-[150px] w-full m-auto bg-orange-500 hover:bg-orange-600 text-white text-xl font-medium text-center py-1 rounded-full mt-2'>Login</button>
                    </form>
                    <p>Don't have an account? <Link to={"/register"} className='hover:font-medium text-orange-700 underline'>Register</Link></p>
                </div>
            </div>

        </div>
    )
}

export default Login