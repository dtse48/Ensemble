import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"
import "./NavigationBar.css";

function NavigationBar(props) {
    return (
        <div>
            <Navbar bg = "color" variant = "dark">
                <Navbar.Brand href = "/">Ensemble</Navbar.Brand>
                <Nav><Nav.Link href = "/">Home</Nav.Link></Nav>
                <Nav><Nav.Link href = "/login">Login</Nav.Link></Nav>
                <Nav><Nav.Link href = "/create">Create</Nav.Link></Nav>
                <Nav><Nav.Link href = "/chat">Chat</Nav.Link></Nav>
            </Navbar>
            {props.children}
        </div>  
    )
}
export default NavigationBar;