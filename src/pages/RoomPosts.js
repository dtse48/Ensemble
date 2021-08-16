import MyPosts from "./MyPosts";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function RoomPosts() {
    const context = useContext(UserContext);
    return (
        <MyPosts posts={context.currentRoom}></MyPosts>
    );
}

export default RoomPosts;