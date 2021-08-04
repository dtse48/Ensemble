import {createContext} from "react";

export const UserContext = createContext({
    loggedIn: false,
    setLoggedIn: ((auth)=>{}),
    username:"",
    set_Username: ((username)=>{}),
    password:"",
    set_Password: ((password)=>{}),
});