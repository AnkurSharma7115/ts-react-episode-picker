import {IEpisode } from "./interfaces";

function EpisodeList(props:any): JSX.Element {
    const{episodes, toggleFavAction, favourites} =props
    return (
         episodes.map((episode: IEpisode) => {
                    return (
                        <section key={episode.id} className="episode-box">
                            { episode.image && ( <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`} /> ) } 

                            <div> {episode.name} </div>
                            <section>
                                <div> Season: {episode.season} Number: {episode.number} </div>
                                <button type="button" onClick={() => toggleFavAction(episode)}>
                                    {favourites.find( (fav: IEpisode) => fav.id === episode.id ) ? "Remove Fav" : "Favourite"}
                                </button>
                            </section>
                        </section>
                    );
                })
    )
}

export default EpisodeList
