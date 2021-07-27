import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginPage() {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control type = "text"></Form.Control>
                <Form.Label>Password:</Form.Label>
                <Form.Control type = "password"></Form.Control>
            </Form.Group>
            <Button type = "submit" href = "/loggedin">Submit</Button>
        </Form>
    );
}
export default LoginPage;