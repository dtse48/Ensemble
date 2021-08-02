import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useHistory} from "react-router-dom";

function CreateAccount() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [submitted,setSubmitted] = useState(false);
    const history = useHistory();
    function registrationHandler() {
        setSubmitted(true);
        if (username !== "" && password !== "") {
            let userData = {
                username: username,
                password: password
            }
            fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/users.json",
            {
                method:"POST",
                body:JSON.stringify(userData),
                headers: {"Content-Type": "application/json"}
            }).then(() => {
                history.push("/");
                alert("Congratulations, you have created an account!");
            })
        }
    }
    return (
        <div>
            <Form style = {{marginLeft: "auto",marginRight:"auto",marginTop:"15px",width:"25%"}}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type = "text" onBlur={(response)=>{setUsername(response.target.value);}}></Form.Control>
                    {submitted && username === "" ?
                    <div style={{color:"red"}}>Username is required!</div> 
                    : null}
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type = "password" onBlur={(response)=>{setPassword(response.target.value);}}></Form.Control>
                    {submitted && password === "" ?
                    <div style={{color:"red"}}>Password is required!</div> 
                    : null}
                </Form.Group>
                <div style = {{textAlign:"center"}}>
                    <Button style = {{marginTop:"20px",marginLeft:"auto",marginRight:"auto",backgroundColor: "#ff7456",borderColor:"#ff7456"}} onClick = {registrationHandler}>Register</Button>
                </div>
            </Form>
        </div>
    );
}
export default CreateAccount;