import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import { useSelector } from 'react-redux'
const AdminHome = () => {
    const { user } = useSelector((state) => state.auth)
  return (
    <Layout>
      <div className='container'>
        <div className='d-flex flex-column mt-4'>
            <h1>Welcome Admin <i className='text-danger-emphasis '>{user?.name}</i></h1>
            <hr></hr>
            <h3>Manage Blood Bank App</h3>
          
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
        </div>
      </div>
      
    </Layout>
  )
}

export default AdminHome
