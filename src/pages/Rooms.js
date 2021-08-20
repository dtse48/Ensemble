import Room from "../components/Room";

function Rooms(props) {
    return (
        <ul>
            {props.rooms.map(room =>
                <Room
                    roomName={room.roomName}
                    numPosts={room.posts.length}
                    posts={room.posts}
                />)}
        </ul>
    )
}

export default Rooms;