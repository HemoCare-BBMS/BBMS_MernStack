import React, { useEffect, useState } from 'react'
import Layout from './../../components/shared/Layout/Layout'
import API from '../../services/API';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

const InventoryStock = () => {
    const {loading, error,user} = useSelector ((state) => state.auth);
    const [data,setData] = useState([]);
    const getBloodRecords = async() => {
        try {
          const {data} = await API.get('/inventory/get-inventory-admin');
          if(data?.success){
            setData(data?.inventory);
          //  console.log(data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        getBloodRecords();
      },[])
  return (
    <Layout>

              <button type="button" class="btn btn-danger btn-sm mx-5 mt-3">
      
                <Link  to="/admin-analytics" className='nav-link '>
                Analytics
                </Link>
                </button>
                <h4 className='bloodtrans mx-5 mt-3'>Blood Transaction History</h4>
 <table className="table">
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Donor Email</th>
                <th scope="col">Time and Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(record =>(
                <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity } (ml)</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
              
              ))}
            
              
            </tbody>
          </table>
          
    </Layout>
    
    
     
  )
}

export default InventoryStock
