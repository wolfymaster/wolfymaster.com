import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "gatsby"
import React from "react";

const enterMouse = (e) => {
    let {currentTarget} = e;
    let dropdownMenu = document.querySelector(".dropdown-menu");

    clearTimeout(currentTarget.mouseLeave);

    currentTarget.classList.add("show");
    dropdownMenu.classList.add("show");
};

const leaveMouse = (e) => {
    let {currentTarget} = e;
    let dropdownMenu = document.querySelector(".dropdown-menu");

    currentTarget.mouseLeave = setTimeout( () => {
        currentTarget.classList.remove("show");
        dropdownMenu.classList.remove("show");
    }, 200);
};

const Menu = (props) => {
    return <Navbar sticky="top" variant="dark">
        <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown title="Projects" id="basic-nav-dropdown" onMouseOver={enterMouse} onMouseOut={leaveMouse}>
                <NavDropdown.Item as={Link} to="/mentorerie">MentorErie</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/nwpatech">NWPA Tech</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/resume">Resume</Nav.Link>
            <Nav.Link href={process.env.GATSBY_BLOG_URL} target="_blank">Blog</Nav.Link>
            <Nav.Link as={Link} to="/hire">Hire Me</Nav.Link>
        </Nav>
    </Navbar>
};

export default Menu;