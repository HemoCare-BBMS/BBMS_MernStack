import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment';
import API from '../../services/API';

const HospitalList = () => {
  const [data, setData] = useState([]);
  //find donor records
  const getHospitalList = async() =>{
      try {
        const {data} = await API.get('/admin/hospital-list')
        //console.log(data)
        if(data?.success){
          setData(data?.hospitalData)
        }
      } catch (error) {
          console.log(error)
      }
  };

  useEffect(() =>{
      getHospitalList();
  }, []);

  //DELETE FUNCTION
  const handelDelete = async (id) =>{
    try {
      let answer = window.prompt('Are You Sure Do You Want To Delete This Hospital', "sure")
      if(!answer) return
      const {data} = await API.delete(`/admin/delete-donor/${id}`)
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async() =>{

  }

return (
  <Layout>
      <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Registered Date</th>
                      <th scope="col">Last Access</th>
                      <th scope="col">Action</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                      {data?.map((record) => (
                          <tr key={record._id}>
                          <td>{record.hospitalName }</td>
                          <td>{record.email}</td>
                          <td>{record.phone}</td>
                          <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                          <td>{moment(record.lastAccess).format("DD/MM/YYYY hh:mm A")}</td>
                          <td>
                            <button className='btn btn-success' onClick={() => handleEdit(record) }>Update</button>
                          </td>
                          
                          <td>
                            <button className='btn btn-danger' onClick={() => handelDelete(record._id) }>Delete</button>
                          </td>
                          </tr>
                                  
                      ))}
                    
                  </tbody>
                </table>
      
  </Layout>
)
}

export default HospitalList;
