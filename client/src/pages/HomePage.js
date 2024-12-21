import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/shared/Spinner'
import Layout from '../components/shared/Layout/Layout'
import Modal from '../components/shared/modal/Modal'
import API from '../services/API'
import moment from 'moment'

const HomePage = () => {
const {loading, error,user} = useSelector ((state) => state.auth);
const [data,setData] = useState([]);
const navigate = useNavigate();

//get function
const getBloodRecords = async() => {
  try {
    const {data} = await API.get('/inventory/get-inventory');
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
    {user?.role === 'admin' && navigate("/admin")}
    
    {error && <span>{alert(error)}</span>}
      {loading ? <Spinner/> :(
        <>
        <div className="container">
        <h4 className='ms-4' 
        data-bs-toggle="modal" 
        data-bs-target="#staticBackdrop"
        style={{cursor: "pointer"}}>
          
          <i className='fa-solid fa-plus text-success py-4'></i>
          Add Inventory</h4>
                    
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

          <Modal/>
        </div>
        <div>
            <div className="card mb-3">
              <img src="./assets/images/bloodcon.jpg" className="card-img-top" alt="blood donation condition" width="80px" height="350px" />
              <div className="card-body">
                <h5 className="card-title">Blood Donation Info</h5>
                <p className="card-text">The universally accepted criteria for donor selection are: Age between 18 and 60 years. Haemoglobin - not less than 12.5 g/Dl. Pulse - between 50 and 100/minute with no irregularities.</p>
                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
              </div>
            </div>
            </div>
        </>
      )}
       
       </Layout>
    
  )
}

export default HomePage;
