import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import classes from "./Welcome.module.css";

function WelcomePage() {
    const context = useContext(UserContext);
    console.log(context.username);
    console.log(context.password);
    console.log(context.loggedIn);
    return (
        <div className = {classes.main}>
            {context.loggedIn? 
            <div>Welcome back, {context.username}!</div> : <div>Welcome to Ensemble!</div> } 
        </div>
    );
}
export default WelcomePage;