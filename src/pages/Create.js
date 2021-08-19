import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classes from "./Create.module.css";
import Card from "react-bootstrap/Card";
import {useState,useContext,useEffect} from "react";
import { useHistory,Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function CreatePage() {
    let subject = "";
    let songName = "";
    let albumName = "";
    let artistName = "";
    let x = [];
    const history = useHistory();
    const context = useContext(UserContext);
    const [postType, setPostType] = useState("");
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
        if (context.postInfo.postType === "artist") {
            subject = context.username + " on " + context.postInfo.subject;
            artistName = context.postInfo.artistName;
            roomData.roomName = artistName;    
        }
        else {
            if (context.postInfo.postType === "track") {
                songName = context.postInfo.songName;
                roomData.songName = songName;
            }
            if (context.postInfo.postType === "album") {
                albumName = context.postInfo.albumName;
                roomData.albumName = albumName;
            }
            artistName = context.postInfo.artistName;
            subject = context.username + " on " + context.postInfo.subject;
            roomData.roomName = context.postInfo.subject;
        }
        roomData.artistName= artistName;
        roomData.posts = [subject + " " + tag];
        console.log(roomData);
        console.log(roomData.posts);
        const postData = {
            postType: context.postInfo.postType,
            subject: "@"+subject,
            desc: desc,
            image: context.postInfo.imageUrl,
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
            {console.log(context.postInfo)}
            {context.loggedIn ? 
                <div style={{marginTop:"50px"}}>
                    {showForm === true ?
                    <Form className = {classes.form} onSubmit = {submitHandler} style={{width:"25%",margin:"auto"}}>
                        <Form.Group>
                            <Form.Label>What do you want to say about [{context.postInfo.subject}]?</Form.Label>
                            <Form.Control as = "textarea" onBlur = {(response => {setDesc(response.target.value);})}></Form.Control>
                            {desc === "" && submitted === true? 
                                        <p className = {classes.error}>Description is required!</p>
                            : null}
                        </Form.Group>
                        <div style={{textAlign:"center"}}><Button style = {{backgroundColor: "#ff7456", marginTop: "20px", borderColor: "#ff7456",textAlign:"center"}} type = "submit" onClick={()=>setShowForm(false)}>Submit</Button></div>
                    </Form>
                    : 
                    <div style={{marginTop:"50px"}}> 
                        <h5 className = {classes.simpleText}>Your post will look like this:</h5>
                        <Card style = {{width: "500px",margin:"auto"}}>
                            <Card.Header>
                                {context.postInfo.postType === "track" ?
                                <div>
                                    <Link>@{context.username}</Link> on <Link>{context.postInfo.songName}</Link> by <Link>{context.postInfo.artistName}</Link>
                                </div> 
                                :
                                null}
                            </Card.Header> 
                            <Card.Img src = {context.postInfo.imageUrl} style = {{width: "50%", marginRight: "auto", display: "block", marginLeft: "auto", marginTop: "40px"}}></Card.Img>
                            <Card.Body>
                                <hr></hr>
                                <Card.Text>"{desc}"</Card.Text>
                            </Card.Body>
                            <Card.Footer style = {{textAlign:"right"}}>{today}</Card.Footer>
                        </Card>
                        <h5 className = {classes.simpleText}>Would you like to post this?</h5>
                        <div style = {{textAlign: "center"}}>
                            <Button style = {{backgroundColor: "#ff7456",marginRight:"15px",borderColor:"#ff7456"}} onClick = {confirmPost}>Yes</Button><Button as={Link} to="/" style = {{backgroundColor:"white",color:"red",borderColor:"red"}}>No</Button>
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