import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./Create.module.css";
import Card from "react-bootstrap/Card";
import {useState,useContext,useEffect} from "react";
import {useHistory} from "react-router-dom";
import { UserContext } from "../context/UserContext";

function CreatePage() {
    let subject = "";
    let songName = "";
    let albumName = "";
    let artistName = "";
    let x = [];
    const history = useHistory();
    const context = useContext(UserContext);
    const [postType, setPostType] = useState("Song");
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");
    const [numPosts, setNumPosts] = useState(0);
    const [loadedRooms, setLoadedRooms] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [roomPosts, setRoomPosts] = useState([]);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let tag = new Date().toLocaleString();
    function submitHandler(event) {
        event.preventDefault();
        setSubmitted(true);
        if ((postType === "Artist" && name1 !== "" && desc !== "" && image !== "") || (postType !== "Artist" && name1 !== "" && name2 !== "" && desc !== "" && image !== "")) {
            setShowForm(false);
        }
    }
    useEffect(() => {
        fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/users/" + context.userId + ".json")
        .then(response => {
            return response.json();
        }).then(data => {
            setNumPosts(data.numPosts);
        });
    },[]);
    useEffect(() => {
        fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/rooms.json")
        .then(response => {
            return response.json();
        }).then(data => {
            setLoadedRooms(data);
        });
    },[]);
    function confirmPost() {
        const roomData = {};
        let foundRoom = false;
        if (postType === "Artist") {
            subject = context.username + " on " + name1;
            artistName = name1;
            roomData.roomName = artistName;    
        }
        else {
            if (postType === "Song") {
                songName = name1;
                roomData.songName = name1;
            }
            if (postType === "Album") {
                albumName = name1;
                roomData.albumName = name1;
            }
            artistName = name2;
            subject = context.username + " on " + name1 + " by " + name2;
            roomData.roomName = name1 + " by " + name2;
        }
        roomData.artistName= artistName;
        roomData.posts = [subject + " " + tag];
        console.log(roomData.posts);
        const postData = {
            postType: postType,
            subject: subject,
            desc: desc,
            image: image,
            username:context.username,
            date:today,
            id: subject+" "+tag
        }
        if (songName !== "") {
            postData.songName = songName;
        }
        else if (albumName !== "") {
            postData.albumName = albumName;
        }
        postData.artistName = artistName;
        fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/posts.json",
        {
            method:"POST",
            body:JSON.stringify(postData),
            headers: {"Content-Type": "application/json"}
        }).then(() => {
            fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/users/" + context.userId + ".json",
            {
                method:"PATCH",
                body:JSON.stringify({
                    numPosts:numPosts+1
                }),
                headers: {"Content-Type": "application/json"}
            }).then(() => {
                // history.push("/");
                history.push("/successfulpost")
            });
        });
        if (loadedRooms !== []) {
            for (const key in loadedRooms) {
                if (loadedRooms[key].roomName === roomData.roomName) {
                    foundRoom = true;
                    fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/rooms/" + key + ".json")
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        console.log("data: " + data);
                        x = data.posts.concat(subject + " " + tag)
                        console.log(x);
                        console.log("updated data.posts: " + x);
                    }).then(() => {
                        fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/rooms/" + key + ".json",
                        {
                            method:"PATCH",
                            body:JSON.stringify({
                                posts:x
                            }),
                            headers: {"Content-Type": "application/json"}
                        })
                    })   
                }
            }
            if (foundRoom === false) {
                fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/rooms.json",
                {
                    method:"POST",
                    body:JSON.stringify(roomData),
                    headers: {"Content-Type": "application/json"}
                })
            }
        }
        else {
            fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/rooms.json",
                {
                    method:"POST",
                    body:JSON.stringify(roomData),
                    headers: {"Content-Type": "application/json"}
                })
        }
    }
    return (
        <div>
            {console.log(loadedRooms)}
            {context.loggedIn ? 
                <div style={{marginTop:"10px"}}>
                    {showForm === true ?
                    <Form className = {classes.form} onSubmit = {submitHandler} style={{width:"25%",margin:"auto"}}>
                        <Form.Group>
                            <Form.Label>Post Type:</Form.Label>
                            <Form.Control as = "select" onChange = {(type) => {setPostType(type.target.value);}}>
                                <option value = "Song">Song</option>
                                <option value = "Album">Album</option>
                                <option value = "Artist">Artist</option>
                            </Form.Control>
                            <Form.Label>{postType} Name:</Form.Label>
                            <Form.Control type = "text" onBlur = {(response => {setName1(response.target.value);})}></Form.Control>
                            {name1 === "" && submitted === true ? 
                                <p className = {classes.error}>{postType} name is required!</p>
                            : null}
                            {postType !== "Artist" ? 
                                <div>
                                    <Form.Label>Artist Name:</Form.Label>
                                    <Form.Control type = "text" onBlur = {(response => {setName2(response.target.value);})}></Form.Control>
                                    {name2 === "" && submitted === true ? 
                                        <p className = {classes.error}>Artist name is required!</p>
                                    : null}
                                </div> 
                            : null}
                            <Form.Label>What do you want to say about [ {name1} ] ?</Form.Label>
                            <Form.Control as = "textarea" onBlur = {(response => {setDesc(response.target.value);})}></Form.Control>
                            {desc === "" && submitted === true? 
                                        <p className = {classes.error}>Description is required!</p>
                            : null}
                            <Form.Label>Image link:</Form.Label>
                            <Form.Control type = "text" onBlur = {(response) => {setImage(response.target.value);}}></Form.Control>
                            {image === "" && submitted === true? 
                                        <p className = {classes.error}>Image link is required!</p>
                            : null}
                        </Form.Group>
                        <div style={{textAlign:"center"}}><Button style = {{backgroundColor: "#ff7456", marginTop: "20px", borderColor: "#ff7456",textAlign:"center"}} type = "submit">Submit</Button></div>
                    </Form>
                    : 
                    <div style={{marginTop:"50px"}}> 
                        <h5 className = {classes.simpleText}>Your post will look like this:</h5>
                        <Card style = {{width: "500px",margin:"auto"}}>
                            {postType === "Artist" ?
                            <Card.Header>{context.username} on {name1}</Card.Header> 
                            : 
                            <Card.Header>{context.username} on {name1} by {name2}</Card.Header> 
                            }
                            <Card.Img src = {image} style = {{width: "50%", marginRight: "auto", display: "block", marginLeft: "auto", marginTop: "40px"}}></Card.Img>
                            <Card.Body>
                                <hr></hr>
                                <Card.Text>"{desc}"</Card.Text>
                            </Card.Body>
                            <Card.Footer style = {{textAlign:"right"}}>{today}</Card.Footer>
                        </Card>
                        <h5 className = {classes.simpleText}>Would you like to post this?</h5>
                        <div style = {{textAlign: "center"}}>
                            <Button style = {{backgroundColor: "#ff7456",marginRight:"15px",borderColor:"#ff7456"}} onClick = {confirmPost}>Yes</Button><Button style = {{backgroundColor:"white",color:"red",borderColor:"red"}}>No</Button>
                        </div>               
                    </div> 
                    } 
                </div>
            : 
            <div className={classes.main}>Please log in or create an account to create a post!</div>
            }
        </div>
        
    );
}
export default CreatePage;