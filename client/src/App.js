
import{Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Donor from './pages/Dashboard/Donor';
import Hospitals from './pages/Dashboard/Hospitals';
import Organization from './pages/Dashboard/Organization';
import Consumer from './pages/Dashboard/Consumer';
import Donation from './pages/Donation';
import Analytics from './pages/Dashboard/Analytics';
import DonorList from './pages/Admin/DonorList';
import HospitalList from './pages/Admin/HospitalList';
import OrgList from './pages/Admin/OrgList';
import AdminHome from './pages/Admin/AdminHome';
import Aboutus from './pages/Aboutus';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryStock from './pages/Admin/InventoryStock';
import AdminAnalytics from './pages/Dashboard/AdminAnalytics';

function App() {
  return (
    <>
    <ToastContainer/>
      
      <Routes>
      <Route path="/admin-analytics" element={
          <ProtectedRoute >
          <AdminAnalytics/>
          </ProtectedRoute>
          } 
          />
      <Route path="/inventory-stock" element={
          <ProtectedRoute >
          <InventoryStock/>
          </ProtectedRoute>
          } 
          />
      <Route path="/aboutUs" element={
          <ProtectedRoute >
          <Aboutus/>
          </ProtectedRoute>
          } 
          />
          
      <Route path="/admin" element={
          <ProtectedRoute >
          <AdminHome/>
          </ProtectedRoute>
          } 
          />
      <Route path="/donor-list" element={
          <ProtectedRoute >
          <DonorList/>
          </ProtectedRoute>
          } 
          />

      <Route path="/hospital-list" element={
          <ProtectedRoute >
          <HospitalList/>
          </ProtectedRoute>
          } 
          />

      <Route path="/org-list" element={
          <ProtectedRoute >
          <OrgList/>
          </ProtectedRoute>
          } 
          />
      <Route path="/organization" element={
          <ProtectedRoute >
          <Organization/>
          </ProtectedRoute>
          } 
          />
      <Route path="/hospital" element={
          <ProtectedRoute >
          <Hospitals/>
          </ProtectedRoute>
          } 
          />
          <Route path="/analytics" element={
          <ProtectedRoute >
          <Analytics/>
          </ProtectedRoute>
          } 
          />
      <Route path="/consumer" element={
          <ProtectedRoute >
          <Consumer/>
          </ProtectedRoute>
          } 
          />
          <Route path="/donation" element={
          <ProtectedRoute >
          <Donation/>
          </ProtectedRoute>
          } 
          />
        <Route path="/donor" element={
          <ProtectedRoute >
          <Donor/>
          </ProtectedRoute>
          } 
          />
          <Route path="/" element={
          <ProtectedRoute >
          <HomePage/>
          </ProtectedRoute>
          } 
          />
        <Route path="/login" element={
          <PublicRoute> 
            <Login/>
          </PublicRoute>
          } />
        <Route path='/register' element={
          <PublicRoute>
            <Register/>
          </PublicRoute>
          }
          />

      </Routes>
    </>
  );
}

export default App;
