import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Header from '../../components/shared/Layout/Header';
import API from '../../services/API';

const AdminAnalytics = () => {
    const [data,setData] = useState([])
    const [inventoryData,setInventoryData] = useState([]);
    const colors = ["#AF1740","#982B1C","#CB6040","#FD8B51","#FF9874","#DE7C7D","#B80000","#FF4545"]
    //GET BLOOD GROUP DATA
    const getBloodGroupData = async () =>{
      try {
        const {data} = await API.get('/analytics/admin-bloodGroups-data')
        if(data?.success){
          setData(data?.bloodGroupData);
          //console.log(data);
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    //lifecycle method
    useEffect(() => {
      getBloodGroupData();
    }, []);
  
    //get function
  const getBloodRecords = async() => {
    try {
      const {data} = await API.get('/inventory/get-admin-recent-inventory');
      if(data?.success){
        setInventoryData(data?.inventory);
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
      <>
        <Header />
        <div className='d-flex flex-row flex-wrap'>
            {data?.map((record,i) => (
  
                  <div className="card m-2 p-1" 
                  key={i}
                  style={{width: '18rem', backgroundColor:`${colors[i]}`}}>
                  
                  <div className="card-body">
                    <h1 className="card-title bg-light text-dark text-center mb-3">{record.bloodGroup}</h1>
                    <p className="card-text">
                      Total In : <b>{record.totalIn}</b> (ml)
                    </p>
                    <p className="card-text">
                      Total Out : <b>{record.totalOut}</b> (ml)
                    </p>
                    <div className='card-footer text-light bg-dark text-center'>
                      Total Available:<b>{record.availableBlood}</b> (ml)
                    </div>
                  </div>
                </div>
  
           ))}
        </div>
        <div className='container my-3'>
          <h1 className='my-3'>Recent Blood Transaction</h1>
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
                         {inventoryData?.map(record =>(
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
        </div>
      </>
    );
}

export default AdminAnalytics;
