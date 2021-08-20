import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"
import "./NavigationBar.css";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Link,useHistory} from "react-router-dom";
import {useContext,useState,useEffect} from "react";
import {UserContext} from "../context/UserContext";
import { Icon } from "semantic-ui-react";
import axios from "axios";

function NavigationBar(props) {
    const history = useHistory();
    const context = useContext(UserContext);
    const [input,setInput] = useState("");
    const [loadedRooms,setLoadedRooms] = useState([]);
    const {setLoggedIn} = useContext(UserContext); 
    const {set_Username} = useContext(UserContext);
    const {set_Password} = useContext(UserContext);
    const {set_searchResults} = useContext(UserContext);
    useEffect(() => {
        fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/rooms.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const rooms = [];
            for (const key in data) {
                const room = {
                    id:key,
                    ...data[key]
                }
                rooms.push(room);
            }
            setLoadedRooms(rooms);
            console.log(loadedRooms);
        })
    },[])
    function logOut() {
        setLoggedIn(false);
        set_Username("");
        set_Password("");
        history.push("/");
    }
    function searchHandler() {
        if (input !== "") {
            axios("https://accounts.spotify.com/api/token", {
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded",
                    "Authorization":"Basic "+btoa("3eea88e0a13f4b12ab5b868524abd167"+":"+"3e7ffc17f9b5420a8226a93fe1199349")
                },
                data: "grant_type=client_credentials",
                method: "POST"
            })
            .then(tokenResponse => {
                axios("https://api.spotify.com/v1/search?q="+input+"&type=track,album,artist", {
                    method:"GET",
                    headers:{"Authorization":"Bearer "+tokenResponse.data.access_token}
                })
                .then(searchResponse => {
                    console.log(searchResponse.data);
                    const matchingRooms = [];
                    for (const key in searchResponse.data) {
                        for (const item of searchResponse.data[key].items) {
                            for (const room of loadedRooms) {
                                if (room.songName === item.name || room.artistName === item.name || room.albumName === item.name) {
                                    if (!matchingRooms.includes(room)) {
                                        matchingRooms.push(room);
                                    }
                                }
                            }
                        }
                    }
                    console.log(matchingRooms);
                    set_searchResults(matchingRooms);
                    history.push("/searchresults");
                })
            })    
        }
        // set_searchInput(input);
        // history.push("/searchresults")
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