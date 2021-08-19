import {createContext} from "react";

export const UserContext = createContext({
    loggedIn: false,
    setLoggedIn: ((auth)=>{}),
    username:"",
    set_Username: ((username)=>{}),
    password:"",
    set_Password: ((password)=>{}),
    searchInput:"",
    set_searchInput:((searchInput)=>{}),
    searchInputType:"",
    set_searchInputType:((searchInputType)=>{}),
    userId:"",
    set_UserId:((userId)=>{}),
    profilePicture:"",
    set_ProfilePicture:((profilePicture)=>{}),
    numPosts:0,
    set_NumPosts:((numPosts)=>{}),
    currentRoom:"",
    set_currentRoom:((currentRoom)=>{}),
    currentProfile:"",
    set_currentProfile:((currentProfile)=>[])
});