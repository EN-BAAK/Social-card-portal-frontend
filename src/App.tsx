import React from 'react'
import Header from './layouts/Header'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppContext } from './context/AppProvider';
import Login from './pages/Login';
import Settings from './pages/Settings';
import SocialMedias from './pages/SocialMedias';
import Customers from './pages/Customers';
import CreateCustomers from './pages/CreateCustomers';
import Cards from './pages/Cards';
import ErrorRouter from './components/ErrorRouter';

const App = (): React.JSX.Element => {
  const { isLoggedIn } = useAppContext()

  return (
    <div id='App'>

      <Router>
        <Routes>
          {isLoggedIn ?
            (
              <>
                <Route path="/create-customer" element={
                  <div >
                    <Header />
                    <CreateCustomers />
                  </div>
                } />
                <Route path="/create-customer/:id" element={
                  <div >
                    <Header />
                    <CreateCustomers />
                  </div>
                } />
                <Route path="/customers" element={
                  <div >
                    <Header />
                    <Customers />
                  </div>
                } />
                <Route path="/medias" element={
                  <div >
                    <Header />
                    <SocialMedias />
                  </div>
                } />
                <Route path="/settings" element={
                  <div >
                    <Header />
                    <Settings />
                  </div>
                } />
                <Route path="/dashboard" element={<Navigate to="/medias" />} />
              </>
            )
            : (
              <>
                <Route path="/dashboard" element={<Login />} />
              </>
            )
          }
          < Route path="/:domain" element={<Cards />} />
          < Route path="/" element={<Navigate to={"/dashboard"} />} />
          < Route path="*" element={<ErrorRouter />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
