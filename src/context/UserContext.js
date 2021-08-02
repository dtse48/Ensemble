import {createContext} from "react";

export const UserContext = createContext({
    loggedIn: false,
    setLoggedIn: ((auth)=>{}),
    userInfo: {
        username: "",
        password: ""
    }
});