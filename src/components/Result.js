import { Menu } from "semantic-ui-react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import classes from "./Result.module.css";

function Result(props) {
    const history = useHistory();
    const {set_postInfo} = useContext(UserContext);
    function redirect() {
        if (props.searchInputType === "track") {
            set_postInfo({
                subject: props.songName+" by "+props.artistName,
                songName: props.songName,
                artistName: props.artistName,
                imageUrl:props.imageUrl,
                postType: "track"
            });
        }
        else if (props.searchInputType === "album") {
            set_postInfo({
                subject:props.albumName+" by "+props.artistName,
                albumName: props.albumName,
                artistName: props.artistName,
                imageUrl:props.imageUrl,
                postType: "album"
            });
        }
        else {
            if (props.imageUrl.length !== 0) {
                set_postInfo({
                    subject:props.artistName,
                    artistName:props.artistName,
                    imageUrl:props.imageUrl[1].url,
                    postType: "artist"
                });    
            }
            else {
                set_postInfo({
                    subject:props.artistName,
                    artistName:props.artistName,
                    imageUrl:"https://www.psi.org.kh/wp-content/uploads/2019/01/profile-icon-300x300.png",
                    postType: "artist"
                }); 
            }  
        }
        history.push("/designpost");
    }
    return (
        <div>
            {props.searchInputType === "track"?
            <div style={{width:"50%",margin:"auto"}}>
                <Menu borderless widths={2} className={classes.menu} style={{marginTop:"50px"}} onClick={redirect}>
                    <Menu.Item link style={{width:"100%"}}>
                        <Menu.Item header>
                            {props.songName} by {props.artistName}
                        </Menu.Item>
                        <Menu.Item>
                            <span><img src={props.imageUrl} style={{width:"50%"}}></img></span>
                        </Menu.Item>
                    </Menu.Item>
                </Menu>
            </div>
            :
            null}
            {props.searchInputType === "album"?
            <div style={{width:"50%",margin:"auto"}}>
                <Menu borderless widths={2} className={classes.menu} style={{marginTop:"50px"}} onClick={redirect}>
                    <Menu.Item link style={{width:"100%"}}>
                        <Menu.Item header>
                            {props.albumName} by {props.artistName}
                        </Menu.Item>
                        <Menu.Item>
                            <span><img src={props.imageUrl} style={{width:"50%"}}></img></span>
                        </Menu.Item>
                    </Menu.Item>
                </Menu>
            </div>
            :
            null}
            {props.searchInputType === "artist"?
            <div style={{width:"50%",margin:"auto"}}>
                <Menu borderless widths={2} className={classes.menu} style={{marginTop:"50px"}} onClick={redirect}>
                    <Menu.Item link style={{width:"100%"}}>
                        <Menu.Item header>
                            {props.artistName}
                        </Menu.Item>
                        <Menu.Item>
                            {props.imageUrl.length !== 0 ?
                            <span><img src={props.imageUrl[1].url} style={{width:"50%"}}></img></span>
                            :
                            <span><img src="https://www.psi.org.kh/wp-content/uploads/2019/01/profile-icon-300x300.png"style={{width:"150px",height:"150px"}}></img></span>
                            }
                        </Menu.Item>
                    </Menu.Item>
                </Menu>
            </div>
            :
            null}
        </div>
    );
}
export default Result;