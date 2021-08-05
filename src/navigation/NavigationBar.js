import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"
import "./NavigationBar.css";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Link,useHistory} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import SearchResults from "../pages/SearchResults";
import MyPosts from "../pages/MyPosts";

function NavigationBar(props) {
    const history = useHistory();
    const context = useContext(UserContext);
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
                <Nav><Nav.Link as={Link} to = "/" onClick={logOut}>Log Out</Nav.Link></Nav>
                }
                <div style={{textAlign:"right"}}>
                    <Form className="d-flex" style={{marginLeft:"5px"}}>
                        <FormControl
                            onChange = {(response => {set_searchInput(response.target.value);})}
                            // type="search"
                            placeholder="Song, Album, Artist, or User"
                            // className="mr-2"
                            // aria-label="Search"
                        />
                        <Button as={Link} to="/searchresults" variant="success" style={{marginLeft:"10px"}}>Search</Button>
                    </Form>
                </div>
            </Navbar>
            {props.children}     
        </div>  
    )
}
export default NavigationBar;