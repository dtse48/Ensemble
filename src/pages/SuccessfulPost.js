import { useState } from "react";
import classes from "./Welcome.module.css";
import {Message} from "semantic-ui-react";

function SuccessfulPost() {
    const [showMessage,setShowMessage] = useState(true);
    function dismissMessage() {
        setShowMessage(false);
    }
    return (
        <div className = {classes.main}>
            {showMessage ?
            <Message positive style={{width:"50%",margin:"auto"}} onDismiss = {dismissMessage}>
                <Message.Header>Post successful!</Message.Header>
            </Message>
            :null}
        </div>
    );
}
export default SuccessfulPost;