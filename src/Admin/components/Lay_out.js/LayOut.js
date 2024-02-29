import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../../user/redux/action/auth.action';
import Button from '../../../user/components/UI/button/Button';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { Logout } from '@mui/icons-material';

function Lay_out({ children }) {
    let [toggle, setToogle] = useState(true);
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutRequest())
    }

    const handleToggleSwitch = () => {
        setToogle(!toggle)
    }

    return (
        <div>
            <nav id='navAdmin' className={toggle ? 'sidebar' : 'close'}>
                <div className="logo-name">
                    <div className="logo-image">
                        {/* <img src="/assets/img/admin/logo.png" alt /> */}
                    </div>
                    <span className="logo_name">Italian Stitch</span>
                </div>
                <div className="menu-items">
                    <ul className="nav-links">
                        <li>
                            <NavLink to="/admin/">
                                <DashboardIcon style={{ marginRight: '18px', fontSize: '28px', color: '#707070' }} />
                                <span className="link-name">Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/category">
                                <CategoryIcon style={{ marginRight: '18px', fontSize: '28px', color: '#707070' }} />
                                <span className="link-name">Category</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/subcategory">
                                <ClassIcon style={{ marginRight: '18px', fontSize: '28px', color: '#707070' }} />
                                <span className="link-name">Subcategory</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/product">
                                <AddShoppingCartIcon style={{ marginRight: '18px', fontSize: '28px', color: '#707070' }} />
                                <span className="link-name">Product</span>
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to="/admin/order">
                                <Inventory2OutlinedIcon style={{ marginRight: '18px', fontSize: '28px', color: '#707070' }} />
                                <span className="link-name">Order</span>
                            </NavLink>
                        </li> */}
                    </ul>
                    <ul className="logout-mode">
                        <li>
                            <a onClick={() => handleLogout()}>
                                <Button><Logout fontSize="small" />Logout</Button>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav >

            <section className="dashboard">
                <div className="top">
                    <i className="uil uil-bars sidebar-toggle" onClick={() => handleToggleSwitch()} />
                    <div className="search-box">
                        <i class="fa-solid fa-magnifying-glass" style={{ fontSize: "20px" }}></i>
                        <input type="search" placeholder="Search here..." />
                    </div>
                    <img src="" alt />
                </div>
                {children}
            </section>
        </div >

    );
}

export default Lay_out;