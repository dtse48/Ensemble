import Result from "./Result";

function ResultList(props) {
    return (
        <ul>
            {props.searchInputType === "track" ?
            <div>
            {props.searchResult.map(result => 
                <Result
                    albumPicture={result.album.images[1].url}
                    searchInputType="track"
                />
            )}
            </div>
            :null}
            {props.searchInputType === "album" ?
            <div>
            {props.searchResult.map(result => 
                <Result
                    albumPicture={result.images[1].url}
                    searchInputType="album"
                />
            )}
            </div>
            :null}  
        </ul>
    )
}

export default ResultList;