import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import classes from "./Create.module.css";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.css";
function CreatePage() {
    const [postType, setPostType] = useState("Song");
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [showForm, setShowForm] = useState(true);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    function submitHandler(event) {
        event.preventDefault();
        setSubmitted(true);
        if ((postType == "Artist" && name1 !== "" && desc !== "" && image !== "") || (postType !== "Artist" && name1 !== "" && name2 !== "" && desc !== "" && image !== "")) {
            setShowForm(false);
        }
    }
    return (
        <div>
        {showForm === true ?
            <Form className = {classes.form} onSubmit = {submitHandler}>
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
                <Button style = {{backgroundColor: "#ff7456", marginTop: "20px" }} type = "submit">Submit</Button>
            </Form>
        : 
            <div> 
                <h5 class = {classes.simpleText}>Your post will look like this:</h5>
                <Card style = {{width: "1000px",margin:"auto"}}>
                    {postType == "Artist" ?
                    <Card.Header>Username on {name1}</Card.Header> 
                    : 
                    <Card.Header>Username: {name1} by {name2}</Card.Header> 
                    }
                    <Card.Img src = {image} style = {{width: "25%", marginRight: "auto", display: "block", marginLeft: "auto", marginTop: "40px"}}></Card.Img>
                    <Card.Body>
                        <hr></hr>
                        <Card.Text>"{desc}"</Card.Text>
                    </Card.Body>
                </Card>
                <h5 class = {classes.simpleText}>Would you like to post this?</h5>
                <div style = {{textAlign: "center"}}>
                    <Button style = {{marginRight:"15px"}}>Yes</Button><Button style = {{backgroundColor:"white",color:"red",borderColor:"red"}}>No</Button>
                </div>               
            </div> 
        } 
        </div>
    );
}
export default CreatePage;