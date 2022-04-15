import {React} from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {

    const navbar = (
        <nav>
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
            <h1>Header</h1>
            {navbar}
        </header>
    );
}

export default Header;