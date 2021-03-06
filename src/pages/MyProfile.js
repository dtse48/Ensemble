import { useState,useContext,useEffect } from "react";
import { UserContext } from "../context/UserContext";
import MyPosts from "./MyPosts";

function MyProfile() {
    const [loadedPosts,setLoadedPosts] = useState([]);
    const context = useContext(UserContext);
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
                    if (context.username === post.username) {
                        posts.push(post);
                    } 
                }
                setLoadedPosts(posts.reverse());
            });
        },[])
    console.log(loadedPosts);
    return(
        <MyPosts posts={loadedPosts}></MyPosts>
    );
}
export default MyProfile;