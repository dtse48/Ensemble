import { Card } from "react-bootstrap";

function Post(props) {
    return ( 
        <Card style = {{width: "1000px",margin:"auto",marginTop:"45px"}}>
            <Card.Header>{props.subject}</Card.Header> 
            <Card.Img src = {props.image} style = {{width: "25%", marginRight: "auto", display: "block", marginLeft: "auto", marginTop: "40px"}}></Card.Img>
            <Card.Body>
                <hr></hr>
                <Card.Text>"{props.desc}"</Card.Text>
            </Card.Body>
            <Card.Footer style = {{textAlign:"right"}}>{props.date}</Card.Footer>
        </Card>           
    );
}
export default Post;