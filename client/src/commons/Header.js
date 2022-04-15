import {React} from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"

const Header = (props) => {

    const navbar = (
        <nav id="header-nav">
            <NavLink to="/orders">
                Orders
            </NavLink>
            <NavLink to="/info">
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