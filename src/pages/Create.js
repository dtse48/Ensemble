import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import classes from "./Create.module.css";
import {useHistory} from "react-router-dom";

function CreatePage() {
    const [postType, setPostType] = useState("Song");
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [desc, setDesc] = useState("");
    const history = useHistory();
    const [name1Blank, setName1Status] = useState(false);
    const [name2Blank, setName2Status] = useState(false);
    const [descBlank, setDescStatus] = useState(false);
    function submitHandler(event) {
        event.preventDefault();
        if (postType === "Artist" && name1 !== "" && desc !== "") {
            history.replace("/newpost");
        }
        if (postType !== "Artist" && name1 !== "" && name2 !== "" && desc !== "") {
            history.replace("/newpost");
        }
        if (name1 === "") {
            setName1Status(true);
        }
        else {
            setName1Status(false);
        }
        if (name2 === "") {
            setName2Status(true);
        }
        else {
            setName2Status(false);
        }
        if (desc === "") {
            setDescStatus(true);
        }
        else {
            setDescStatus(false);
        }
    }
    return (
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
                {name1Blank ? 
                    <p className = {classes.error}>{postType} name is required!</p>
                : null}
                {postType !== "Artist" ? 
                    <div>
                        <Form.Label>Artist Name:</Form.Label>
                        <Form.Control type = "text" onBlur = {(response => {setName2(response.target.value);})}></Form.Control>
                        {name2Blank ? 
                            <p className = {classes.error}>Artist name is required!</p>
                        : null}
                    </div> 
                : null}
                <Form.Label>What do you want to say about [ {name1} ] ?</Form.Label>
                <Form.Control as = "textarea" onBlur = {(response => {setDesc(response.target.value);})}></Form.Control>
                {descBlank ? 
                            <p className = {classes.error}>Description is required!</p>
                : null}
            </Form.Group>
            <Button type = "submit">Submit</Button>
        </Form>
    );
}
export default CreatePage;