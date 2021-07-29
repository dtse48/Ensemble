import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginPage() {
    return (
        <div>
            <Form style = {{marginLeft: "auto",marginRight:"auto",marginTop:"15px",width:"25%"}}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type = "text"></Form.Control>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type = "password"></Form.Control>
                </Form.Group>
                <div style = {{textAlign:"center"}}>
                    <Button style = {{marginTop:"20px",marginLeft:"auto",marginRight:"auto",backgroundColor: "#ff7456",borderColor:"#ff7456"}}>Log in</Button>
                </div>
            </Form>
            <div style={{textAlign:"center",marginTop:"15px"}}>Don't have an account? Create one here</div>
        </div>
    );
}
export default LoginPage;