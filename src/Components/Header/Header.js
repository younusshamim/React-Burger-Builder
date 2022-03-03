import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/logo.png';

const Header = () => {
    return (
        <div className="Navigation">
            <Navbar style={{ backgroundColor: "#D70F64", height: "70px" }}>
                <div className="container">
                    <NavbarBrand href="/" className="ml-md-5 Brand">
                        <img src={Logo} alt="logo" width="60" />
                    </NavbarBrand>

                    <Nav className="mr-md-5">
                        <NavItem>
                            <NavLink to="/" exact className="NavLink">Burger Builder</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/orders" exact className="NavLink">Orders</NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar>
        </div>
    )
}

export default Header;
