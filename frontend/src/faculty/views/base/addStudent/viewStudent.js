import axios from "axios";
import { useEffect, useState } from "react";

export default function ViewStudent()
{
    const[data,setData]=useState([]);
    useEffect(()=>{
        axios.get('')
        .then(response=>{
            setData(response.data)
        })
        .catch((err)=>{
            console.log("axios error",err);
        })
    },[])
    return(
        <>
        
        <div className="container mt-5 text-center">
            <h2 className="mb-4">view student details</h2>
            {/* <button type="button" class="btn btn-primary mb-4" onClick={add}>Add Product</button> */}

        <table className="table table-striped table-bordered">
  <thead>
    <tr>
      <th>PRODUCT NAME</th>
      <th>QUANTITY</th>
      <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    {
        data.map((datas)=>(
            
                <tr key={datas._id}>
                          

                    <td>{datas.productName}</td>
                    <td>{datas.quantity}</td>
                    
                    <td><button class="btn btn-success m-1" onClick={()=>update(datas._id)}>UPDATE</button>
                    <button class="btn btn-danger" onClick={()=>del(datas._id)}>DELETE</button></td>
                </tr>
           
        ))
 
       }
    
  </tbody>
</table>
        </div>
        </>
    );
}