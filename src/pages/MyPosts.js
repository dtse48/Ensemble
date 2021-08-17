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
                    songName={post.songName}
                    artistName={post.artistName}
                    albumName={post.albumName}
                />)}
        </ul>
    )
}
export default MyPosts;