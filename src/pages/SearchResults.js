import {useContext,useEffect,useState} from "react";
import {UserContext} from "../context/UserContext";
import MyPosts from "./MyPosts";

function SearchResults() {
    const context = useContext(UserContext);
    const [loadedPosts,setLoadedPosts] = useState([]);
    useEffect(() => 
        {
            fetch("https://ensemble-75caf-default-rtdb.firebaseio.com/posts.json"
            ).then(response => {
                return response.json();
            }).then(data => {
                const posts = [];
                for (const key in data) {
                    const post = {
                        id: key,
                        ...data[key]
                    }
                    if (context.searchInput === post.songName || context.searchInput === post.artistName || context.searchInput === post.albumName) {
                        posts.push(post);
                    } 
                }
                setLoadedPosts(posts.reverse());
            });
        },[context.searchInput])
    return (
        <div>
            <h6 style={{textAlign:"center",marginTop:"20px"}}>Search Results:</h6>
            <MyPosts posts={loadedPosts}></MyPosts>
        </div>
    );
}
export default SearchResults;