import React, { useState } from 'react'

const AddProduct=()=>{
    const [name, setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const [error,setError]=useState(false);

    const Add=async()=>{
        if(!name || !price || !category ||!company){
            setError(true);
            return false;
        }
        console.log(name,price,category,company);
        
        const userId =JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId);

        let result=await fetch("http://localhost:5000/add-product",{
            method:"post",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                "Content-type":"application/json"
            }
        });
        result=await result.json();
        console.log(result);
    }

    return(
        <div className='addproduct'>
            <h1>Add Product</h1>

            <input className='inputBox' type='text' placeholder='Enter Product Name'
          value={name} onChange={(e)=>setName(e.target.value)}/>
          {error && !name && <span className='invalidMsg'>Enter valid name</span>}

          <input className='inputBox' type='text' placeholder='Enter Product Price '
          value={price} onChange={(e)=>setPrice(e.target.value)}/>
          {error && !price && <span className='invalidMsg'>Enter valid price</span>}

          <input className='inputBox' type='text' placeholder='Enter Product Category'
          value={category} onChange={(e)=>setCategory(e.target.value)}/>
          {error && !category && <span className='invalidMsg'>Enter valid category</span>}

          <input className='inputBox' type='text' placeholder='Enter Product Company'
          value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
          {error && !company && <span className='invalidMsg'>Enter valid company</span>}

          <button onClick={Add} className='appButton' type='button'>Add Product</button>
        </div>
    )
}

export default AddProduct;