import {useContext,useEffect,useState} from "react";
import {UserContext} from "../context/UserContext";
import Rooms from "./Rooms.js";

function SearchResults() {
    const context = useContext(UserContext);
    const [loadedRooms,setLoadedRooms] = useState([]);
    useEffect(() => 
        {
            fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/rooms.json"
            ).then(response => {
                return response.json();
            }).then(data => {
                const rooms = [];
                for (const key in data) {
                    const room = {
                        id: key,
                        ...data[key]
                    }
                    room.numPosts = room.posts.length;
                    if (context.searchInput === room.songName || context.searchInput === room.artistName || context.searchInput === room.albumName || context.searchInput === room.roomName) {
                        rooms.push(room);
                    } 
                }
                setLoadedRooms(rooms.reverse());
            });
        },[context.searchInput])
    return (
        <div style={{marginTop:"50px"}}>
            {/* <h6>Search Results:</h6> */}
            <div>
                {loadedRooms.length === 0 ?
                    <div style={{textAlign:"center"}}>Your search returned 0 results!</div>
                :
                <div>
                    <Rooms rooms={loadedRooms}></Rooms>
                </div>    
                }
            </div> 
        </div>
    );
}
export default SearchResults;