function Result(props) {
    return (
        
        <div>
            {props.searchInputType === "track"?
            <img src={props.albumPicture}></img>
            :
            null}
            {props.searchInputType === "album"?
            <img src={props.albumPicture}></img>
            :
            null}
        </div>
    );
}
export default Result;