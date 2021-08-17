import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Rooms from "./Rooms";

function RecentRooms() {
    const [rooms,setRooms] = useState([]);
    useEffect(() => {
        fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/rooms.json").
        then((response) => {
            return response.json();
        }).
        then((data) => {
            const Rooms = [];
            for (const key in data) {
                const room = {
                    id:key,
                    numPosts:data[key].posts.length,
                    ...data[key]
                }
                Rooms.push(room);
            }
            setRooms(Rooms.slice(0,3));
        })
    },[])
    return (
        <div style={{marginTop:"50px",textAlign:"center"}}>
            <p>Here are the three most recently active Rooms!</p>
            <Rooms rooms={rooms}></Rooms>
            <Link to="/create">Create your own post here!</Link>
        </div>
    );
}

export default RecentRooms;