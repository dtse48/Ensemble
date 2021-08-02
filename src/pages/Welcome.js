import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import classes from "./Welcome.module.css";

function WelcomePage() {
    const context = useContext(UserContext);
    return (
        <div className = {classes.main}>
            Welcome to Ensemble 
            {context.loggedIn ? <div>HI!</div> : null}
        </div>
    );
}
export default WelcomePage;