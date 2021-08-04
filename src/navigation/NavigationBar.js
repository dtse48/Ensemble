import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"
import "./NavigationBar.css";
import {Link,useHistory} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";

function NavigationBar(props) {
    const history = useHistory();
    const context = useContext(UserContext);
    const {setLoggedIn} = useContext(UserContext); 
    const {set_Username} = useContext(UserContext);
    const {set_Password} = useContext(UserContext);
    function logOut() {
        setLoggedIn(false);
        set_Username("");
        set_Password("");
        history.push("/");
    }
    return (
        <div>
            <Navbar bg = "color" variant = "dark">
                <Navbar.Brand as = {Link} to = "/" style = {{marginLeft:"25px"}}>Ensemble</Navbar.Brand>
                <Nav><Nav.Link as={Link} to="/" >Home</Nav.Link></Nav>
                <Nav><Nav.Link as={Link}to = "/create">Create</Nav.Link></Nav>
                <Nav className="ml-auto"><Nav.Link as = {Link} to = "/myprofile">Profile</Nav.Link></Nav>
                {!context.loggedIn ? 
                <Nav><Nav.Link as={Link} to = "/login">Log In</Nav.Link></Nav>
                : 
                <Nav><Nav.Link as={Link} onClick={logOut}>Log Out</Nav.Link></Nav>
                }
            </Navbar>
            {props.children}
        </div>  
    )
}
export default NavigationBar;