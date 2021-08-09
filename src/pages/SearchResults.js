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
        <div style={{marginTop:"50px"}}>
            {/* <h6>Search Results:</h6> */}
            <div>
                {loadedPosts.length === 0 ?
                    <div style={{textAlign:"center"}}>Your search returned 0 results!</div>
                :
                <div>
                    <MyPosts posts={loadedPosts}></MyPosts>
                </div>    
                }
            </div> 
        </div>
    );
}
export default SearchResults;