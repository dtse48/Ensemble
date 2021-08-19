import { Form, Button } from "react-bootstrap";
import { useContext,useState,useEffect } from "react";
import { UserContext } from "../context/UserContext";
import classes from "./Create.module.css";
import axios from "axios"
import ResultList from "../components/ResultList";

function CreatePrelim() {
    const context = useContext(UserContext);
    const {set_searchInput} = useContext(UserContext);
    const {set_searchInputType} = useContext(UserContext);
    const [token,setToken] = useState("");
    const [searchResult,setSearchResult] = useState("");
    const [showNext,setShowNext] = useState(false);
    const [showErrors,setShowErrors] = useState(false);
    function submitHandler() {
        if (context.searchInput === "") {
            setShowErrors(true);
        }
        else {
            axios("https://accounts.spotify.com/api/token", {
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded",
                    "Authorization":"Basic "+btoa("3eea88e0a13f4b12ab5b868524abd167"+":"+"3e7ffc17f9b5420a8226a93fe1199349")
                },
                data: "grant_type=client_credentials",
                method: "POST"
            })
            .then(tokenResponse => {
                setToken(tokenResponse.data.access_token);
                axios("https://api.spotify.com/v1/search?q="+context.searchInput+"&type="+context.searchInputType, {
                    method:"GET",
                    headers:{"Authorization":"Bearer "+tokenResponse.data.access_token}
                })
                .then(searchResponse => {
                    if (context.searchInputType === "track") {
                        setSearchResult(searchResponse.data.tracks.items);
                        console.log(searchResponse.data.tracks.items);
                    }
                    else if (context.searchInputType === "album") {
                        setSearchResult(searchResponse.data.albums.items);
                        console.log(searchResponse.data.albums.items);
                    }
                    else if (context.searchInputType === "artist") {
                        setSearchResult(searchResponse.data.artists.items);
                        console.log(searchResponse.data.artists.items);
                    }
                })
                .then(() => {
                    setShowNext(true);
                })
            })
        } 
    }
    useEffect(() => {
        set_searchInputType("track");
        set_searchInput("");
    },[])
    return (
        <div>
            {!showNext ?
            <div>
                {context.loggedIn ? 
                    <div style={{marginTop:"50px"}}>
                        <Form className = {classes.form} style={{width:"25%",margin:"auto"}}>
                            <Form.Group>
                                <Form.Label>Post Type:</Form.Label>
                                <Form.Control as = "select">
                                    <option value = "track" onClick={e=>set_searchInputType(e.target.value)}>Track</option>
                                    <option value = "album" onClick={e=>set_searchInputType(e.target.value)}>Album</option>
                                    <option value = "artist" onClick={e=>set_searchInputType(e.target.value)}>Artist</option>
                                </Form.Control>
                                <Form.Label style={{marginTop:"10px"}}>Name:</Form.Label>
                                <Form.Control type = "text" onChange={e=>set_searchInput(e.target.value)}></Form.Control>
                                {showErrors ?
                                <div style={{color:"red",marginTop:"5px"}}>Name is required!</div>
                                :
                                null
                                }
                            </Form.Group>
                            <div style={{textAlign:"center"}}><Button style = {{backgroundColor: "#ff7456", marginTop: "20px", borderColor: "#ff7456",textAlign:"center"}} onClick={submitHandler}>Search</Button></div>
                        </Form>
                    </div>
                : 
                <div className={classes.main}>Please log in or create an account to create a post!</div>
                }
            </div>
            :
            <div>
                <ResultList searchResult={searchResult} searchInputType={context.searchInputType}></ResultList>
            </div>
            } 
        </div>
    )
}

export default CreatePrelim;