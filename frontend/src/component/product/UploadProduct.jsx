import React, { useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import { ImageConverter } from '../utility/ImageConverter';
import { toast } from 'react-hot-toast';

const Product = () => {

    const [data, SetData] = useState({
        name: '',
        category: '',
        image: '',
        price: '',
        description: '',
    });
    console.log(data)
    const handleOnChange = (e) => {
        const { name, value } = e.target

        SetData((previous) => {
            return {
                ...previous,
                [name]: value
            }
        })
    }
    const uploadImage = async (e) => {
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

        const { name, image, category, price } = data;

        if (name && image && category && price) {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data)
            })

            const fetchResponse = await fetchData.json()
            console.log(fetchResponse)
            toast(fetchResponse.message)

            SetData(() => {
                return {
                    name: '',
                    category: '',
                    image: '',
                    price: '',
                    description: '',
                }
            })
        }
        else {
            toast("Enter required fields")

        }

    }
    return (

        <div className='pt-24 '>
            <div className="p-4 ">
                <form className='m-auto w-full max-w-md p-4 shadow flex flex-col bg-white' onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input type={"text"} name='name' className='bg-slate-200 p-1 my-1' value={data.name} onChange={handleOnChange} />

                    <label htmlFor='category'>Category</label>
                    <select className='bg-slate-200 p-1 my-1' id='category' name='category' value={data.category} onChange={handleOnChange}>
                        <option value={"didn't select any category"}> Select Category</option>
                        <option value={"fruits"}>Fruits</option>
                        <option value={"vegetables"}>Vegetables</option>
                        <option value={"Ice cream"}>Ice Cream</option>
                        <option value={"Grocery"}>Grocery</option>
                        <option value={"Cake"}>Cake</option>
                        <option value={"Main Course"}>Main Course</option>
                        <option value={"Fast Food"}>Fast Food</option>
                    </select>

                    <label htmlFor='image'>Image
                        <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
                            {
                                data.image ? <img src={data.image} className='h-full' /> : <span className='text-6xl'> <BsCloudUpload /> </span>
                            }
                            <input type="file" accept='image/*' id='image' onChange={uploadImage} className='hidden' />
                        </div>
                    </label>


                    <label htmlFor='price' className='my-1'>Price</label>
                    <input type='text' className='bg-slate-200 p-1 my-1' name='price' value={data.price} onChange={handleOnChange} />

                    <label htmlFor='description'>Description</label>
                    <textarea rows='2' type='text' className='bg-slate-200 p-1 my-1 resize-none' name='description' value={data.description} onChange={handleOnChange} ></textarea>

                    <button type='submit' className='bg-orange-400 hover:bg-orange-500 text-white text-xl font-medium my-2'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default Product
