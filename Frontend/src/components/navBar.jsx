import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const NavBar = ({ user }) => {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="#/">
          <Link className="navbar-brand" to="/homepage">
            GoTravel
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <React.Fragment>
                <Nav.Link href="#login">
                  <NavLink className="nav-item nav-link" to="/login">
                    Login
                  </NavLink>
                </Nav.Link>
                <Nav.Link href="#register">
                  <NavLink className="nav-item nav-link" to="/register">
                    Register
                  </NavLink>
                </Nav.Link>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <Nav.Link href="#countries">
                  <NavLink className="nav-item nav-link" to="/countries">
                    Countries
                  </NavLink>
                </Nav.Link>
                <Nav.Link href="#cities">
                  <NavLink className="nav-item nav-link" to="/cities">
                    Cities
                  </NavLink>
                </Nav.Link>
                <Nav.Link href="#wishlist">
                  <NavLink className="nav-item nav-link" to="/wishlist">
                    Wishlist
                  </NavLink>
                </Nav.Link>
                <Nav.Link href="#logout">
                  <NavLink className="nav-item nav-link" to="/logout">
                    Logout
                  </NavLink>
                </Nav.Link>
                {/* <Nav.Link href="#profile">
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
            </Nav.Link> */}
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <Navbar collapseOnSelect expand="lg">
    //   <Navbar.Brand>
    //     <Link className="navbar-brand" to="/">
    //       GoTravel
    //     </Link>
    //   </Navbar.Brand>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="ml-left">
    //       {!user && (
    //         <React.Fragment>
    //           <Nav.Item>
    //             <NavLink className="nav-item nav-link" to="/login">
    //               Login
    //             </NavLink>
    //           </Nav.Item>
    //           <Nav.Item>
    //             <NavLink className="nav-item nav-link" to="/register">
    //               Register
    //             </NavLink>
    //           </Nav.Item>
    //         </React.Fragment>
    //       )}
    //       {user && (
    //         <React.Fragment>
    //           <Nav.Item>
    //             <NavLink className="nav-item nav-link" to="/countries">
    //               Countries
    //             </NavLink>
    //           </Nav.Item>
    //           <Nav.Item>
    //             <NavLink className="nav-item nav-link" to="/cities">
    //               Cities
    //             </NavLink>
    //           </Nav.Item>
    //           <Nav.Item>
    //             <NavLink className="nav-item nav-link" to="/wishlist">
    //               Wishlist
    //             </NavLink>
    //           </Nav.Item>
    //           <Nav.Item>
    //             <NavLink className="nav-item nav-link" to="/profile">
    //               {user.name}
    //             </NavLink>
    //           </Nav.Item>
    //           <Nav.Item>
    //             <NavLink className="nav-item nav-link" to="/logout">
    //               Logout
    //             </NavLink>
    //           </Nav.Item>
    //         </React.Fragment>
    //       )}
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
  );
};

export default NavBar;
