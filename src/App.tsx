import React, { Fragment, useContext, useEffect } from "react";
import { Store } from "./Store";
import { IAction, IEpisode } from "./interfaces";

const EpisodeList = React.lazy(() => import('./EpisodeList'))

function App(): JSX.Element {
    const { state, dispatch } = useContext(Store);

    useEffect(() => {
        state.episodes.length === 0 && fetchData();
    });

    const fetchData = async () => {
        const URL = "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
        const data = await fetch(URL);
        const dataJSON = await data.json();
        return dispatch({
            type: "FETCH_DATA",
            payload: dataJSON._embedded.episodes,
        });
    };
    const toggleFavAction = (episode: IEpisode): IAction  =>
        {
          const episodeInFav = state.favourites.includes(episode)
          let dispatchObj = {
              type: "ADD_FAV",
              payload: episode,
          };
          if (episodeInFav) {
            const favWithoutEpisode = state.favourites.filter((fav:IEpisode)=> fav.id !== episode.id)
              dispatchObj = {
                  type: "REMOVE_FAV",
                  payload: favWithoutEpisode
              };
          }
          return dispatch(dispatchObj); 
        }  
        const props = {
            episodes: state.episodes,
            toggleFavAction,
            favourites: state.favourites,
        }; 
    return (
        <Fragment>
            <header>
                <div>
                    <h1>Ricky and Morty</h1>
                    <p>Pick your favourite episode!!!!</p>
                </div>
                <div>Favourite(s) : {state.favourites.length}</div>
            </header>
            <React.Suspense fallback={<div>Loading....</div>}>
                <section className="episode-layout">
                    <EpisodeList {...props}></EpisodeList>
                </section>
            </React.Suspense>
        </Fragment>
    );
}

export default App;
