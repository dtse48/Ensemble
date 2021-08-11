import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"
import "./NavigationBar.css";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Link,useHistory} from "react-router-dom";
import {useContext,useState} from "react";
import {UserContext} from "../context/UserContext";
import { Icon } from "semantic-ui-react";

function NavigationBar(props) {
    const history = useHistory();
    const context = useContext(UserContext);
    const [input,setInput] = useState("");
    const {setLoggedIn} = useContext(UserContext); 
    const {set_Username} = useContext(UserContext);
    const {set_Password} = useContext(UserContext);
    const {set_searchInput} = useContext(UserContext);
    function logOut() {
        setLoggedIn(false);
        set_Username("");
        set_Password("");
        history.push("/");
    }
    function searchHandler() {
        set_searchInput(input);
        history.push("/searchresults")
    }
    return (
        <div>
            <Navbar bg = "color" variant = "dark">
                <Navbar.Brand as = {Link} to = "/" style = {{marginLeft:"25px"}}>Ensemble</Navbar.Brand>
                <Nav><Nav.Link as={Link} to="/" >Home</Nav.Link></Nav>
                <Nav><Nav.Link as={Link}to = "/create">Create</Nav.Link></Nav>
                <Nav><Nav.Link as = {Link} to = "/myprofile">Profile</Nav.Link></Nav>
                {!context.loggedIn ? 
                <Nav><Nav.Link as={Link} to = "/login">Log In</Nav.Link></Nav>
                : 
                <Nav><Nav.Link as={Link} to = "/" onClick={logOut}>Log Out</Nav.Link></Nav>
                }
                <div style={{textAlign:"right"}}>
                    <Form className="d-flex" style={{marginLeft:"5px"}}>
                        <FormControl
                            onChange = {(response => {setInput(response.target.value); console.log(input)})}
                            // type="search"
                            placeholder="Song, Album, Artist, or User"
                            // className="mr-2"
                            // aria-label="Search"
                        />
                    </Form>
                </div>
                <Nav><Icon name="search" style={{marginLeft:"10px",marginBottom:"2px",color:"white",cursor:"pointer"}} onClick={searchHandler}></Icon></Nav>
            </Navbar>
            {props.children}     
        </div>  
    )
}
export default NavigationBar;