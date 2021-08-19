import Result from "./Result";

function ResultList(props) {
    return (
        <ul>
            {props.searchInputType === "track" ?
            <div>
            {props.searchResult.map(result => 
                <Result
                    songName={result.name}
                    artistName={result.artists[0].name}
                    imageUrl={result.album.images[1].url}
                    searchInputType="track"
                />
            )}
            </div>
            :null}
            {props.searchInputType === "album" ?
            <div>
            {props.searchResult.map(result => 
                <Result
                    albumName={result.name}
                    artistName={result.artists[0].name}
                    imageUrl={result.images[1].url}
                    searchInputType="album"
                />
            )}
            </div>
            :null} 
            {props.searchInputType === "artist" ?
            <div>
            {props.searchResult.map(result => 
                <Result
                    artistName={result.name}
                    imageUrl={result.images}
                    searchInputType="artist"
                />
            )}
            </div>
            :null}  
        </ul>
    )
}

export default ResultList;