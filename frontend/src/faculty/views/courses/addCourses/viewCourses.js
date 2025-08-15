import axios from "axios";
import { useEffect, useState } from "react";

export default function ViewCourses()
{
    const[data,setData]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/course')
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
            <h2 className="mb-4">view student courses</h2>
            {/* <button type="button" class="btn btn-primary mb-4" onClick={add}>Add Product</button> */}

        <table className="table table-striped table-bordered">
  <thead>
    <tr>
      <th>COURSE NAME</th>
      <th>DURATION</th>
      <th>DEPARTMENT</th>
      <th>ACTION</th>
    </tr>
  </thead>
  <tbody>
    {
        data.map((datas)=>(
            
                <tr key={datas._id}>
                          

                    <td>{datas.courseName}</td>
                    <td>{datas.duration}</td>
                    <td>{datas.department}</td>
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