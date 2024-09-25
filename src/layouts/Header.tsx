import React, { useState } from 'react'
import { LuLogOut } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { VscThreeBars } from "react-icons/vsc";
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../api-cilent';
import { Navbar } from 'react-bootstrap';
import { useAppContext } from '../context/AppProvider';

const Header = (): React.JSX.Element => {
  const [isBarActive, setIsBarActive] = useState<boolean>(false)

  const { showToast } = useAppContext();
  const queryClient = useQueryClient()
  const navigateTo = useNavigate();
  const mutation = useMutation(logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      showToast({ message: "Logged out successfully", type: "SUCCESS" });
      navigateTo("/");
    },
    onError: () => {
      showToast({ message: "Logging out failed", type: "ERROR" });
    },
  })

  const logoutHandle = () => mutation.mutate()
  const settingNavigateHandle = () => navigateTo("/settings")
  const barsClickHandle = () => setIsBarActive(!isBarActive)


  const isActiveLink = (path: string): boolean =>
    location.pathname.toLowerCase() === path;

  return (
    <header id='header' className='d-flex justify-content-center align-items-center'>
      <Navbar
        expand="md"
        className="content h-100 py-2 px-md-5 px-2 d-flex align-items-center justify-content-between gap-3 w-100 h-100 shadow">
        <Navbar.Brand className="logo">
          <h1 className='fs-3 m-0'>Digital Card</h1>
        </Navbar.Brand>

        <ul className={`ms-auto text-lg-start text-center ${isBarActive && "active"}`}>
          <li className={`${isActiveLink("/medias") ? "active" : ""} pointer py-md-0 py-1`}>
            <Link to={"/medias"} onClick={() => setIsBarActive(false)}>
              <p className='mb-0'>Social Medias</p>
            </Link>
          </li>
          <li className={`${isActiveLink("/customers") ? "active" : ""} pointer py-md-0 py-1`}>
            <Link to={"/customers"} onClick={() => setIsBarActive(false)}>
              <p className='mb-0'>Customers</p>
            </Link>
          </li>
        </ul>

        <div className='d-flex align-items-center gap-3'>
          <div>
            <IoMdSettings
              onClick={settingNavigateHandle}
              fontSize={25}
              className={`icon transition-3 pointer d-block mx-auto ${isActiveLink("/settings") && "active"}`} />
          </div>

          <div className='d-md-none'>
            <VscThreeBars
              onClick={barsClickHandle}
              fontSize={25}
              className="icon transition-3 pointer d-block mx-auto" />
          </div>

          <div>
            <LuLogOut
              onClick={logoutHandle}
              fontSize={25}
              className='icon transition-3 pointer d-block mx-auto' />
          </div>
        </div>
      </Navbar>
    </header>
  )
}

export default Header
