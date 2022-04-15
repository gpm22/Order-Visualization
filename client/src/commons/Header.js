import {React} from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"

const Header = (props) => {

    const activeStyle = {
        color: "lime"
      };

    const navbar = (
        <nav id="header-nav">
            <NavLink 
                to="/orders"
                style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
                Orders
            </NavLink>
            <NavLink 
                to="/info"
                style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
                Info
            </NavLink>
        </nav>
    );

    return (
        <header>
            {navbar}
        </header>
    );
}

export default Header;