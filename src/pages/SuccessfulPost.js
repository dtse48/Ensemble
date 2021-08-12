import { useState } from "react";
import {Message} from "semantic-ui-react";

function SuccessfulPost() {
    const [showMessage,setShowMessage] = useState(true);
    function dismissMessage() {
        setShowMessage(false);
    }
    return (
        <div style={{marginTop:"50px"}}>
            {showMessage ?
            <Message positive style={{width:"50%",margin:"auto"}} onDismiss = {dismissMessage}>
                <Message.Header>Post successful!</Message.Header>
            </Message>
            :null}
        </div>
    );
}
export default SuccessfulPost;