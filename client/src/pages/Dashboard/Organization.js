import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout';
import API from '../../services/API';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Organization = () => {
    //get current user
    const {user} = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    //find ORG records
    const getOrganizations = async() =>{
        try {
            if(user?.role === 'donor'){
                const {data} = await API.get('/inventory/get-organization')
          //console.log(data)
          if(data?.success){
            setData(data?.organizations)
          }
            }
            if(user?.role === 'hospital'){
                const {data} = await API.get('/inventory/get-organization-for-hospital')
          //console.log(data)
          if(data?.success){
            setData(data?.organizations);
          }
            }
          
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() =>{
        getOrganizations();
    }, [user]);
  return (
    <Layout>
        <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Organization Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Date</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                        {data?.map((record) => (
                            <tr key={record._id}>
                            <td>{record.organizationName}</td>
                            <td>{record.email}</td>
                            <td>{record.phone}</td>
                            <td>{record.address}</td>
                            <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                            </tr>
                                    
                        ))}
                      
                    </tbody>
                  </table>
    </Layout>
  )
}
export default Organization;