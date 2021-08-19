import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";

function Post(props) {
    const history = useHistory();
    const context = useContext(UserContext);
    const {set_currentProfile} = useContext(UserContext);
    const {set_searchInput} = useContext(UserContext);
    const username = "@"+props.username;
    function setTarget() {
        set_currentProfile(props.username);
        history.push("/showprofile");
    }
    function clickedSong() {
        set_searchInput(props.songName);
        history.push("/searchresults");
    }
    function clickedAlbum() {
        set_searchInput(props.albumName);
        history.push("/searchresults");
    }
    function clickedArtist() {
        set_searchInput(props.artistName);
        history.push("/searchresults");
    }
    return (  
        <Card style = {{width: "500px",margin:"auto",marginTop:"45px"}}>
            <Card.Header>
                {props.postType === "track" ?
                <div><Link onClick={setTarget}>{username}</Link> on <Link onClick={clickedSong}>{props.songName}</Link> by <Link onClick={clickedArtist}>{props.artistName}</Link></div>
                :null}
                {props.postType === "album" ?
                <div><Link onClick={setTarget}>{username}</Link> on <Link onClick={clickedAlbum}>{props.albumName}</Link> by <Link onClick={clickedArtist}>{props.artistName}</Link></div>
                :null}
                {props.postType === "artist" ?
                <div><Link onClick={setTarget}>{username}</Link> on <Link onClick={clickedArtist}>{props.artistName}</Link></div>
                :null}
            </Card.Header> 
            <Card.Img src = {props.image} style = {{width: "50%", marginRight: "auto", display: "block", marginLeft: "auto", marginTop: "40px"}}></Card.Img>
            <Card.Body>
                <hr></hr>
                <Card.Text>"{props.desc}"</Card.Text>
            </Card.Body>
            <Card.Footer style = {{textAlign:"right"}}>{props.date}</Card.Footer>
        </Card>           
    );
}
export default Post;