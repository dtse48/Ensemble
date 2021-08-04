import Post from "../components/Post";

function MyPosts(props) {
    return (
        <ul>
            {props.posts.map(post =>
                <Post
                    postType={post.postType}
                    subject={post.subject}
                    desc={post.desc}
                    image={post.image}
                    username={post.username}
                    date={post.date}
                />)}
        </ul>
    )
}
export default MyPosts;