import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useGlobalContext } from '../context/global';

function Airing({ rendered }) {
  const { airingAnime, isSearch, searchResults } = useGlobalContext();

  const animeList = !isSearch && rendered === 'airing' ? airingAnime : searchResults;

  return (
    <div>
      {/* Show Sidebar only when rendered is 'popular' */}
      {rendered === 'popular' && !isSearch && <Sidebar />}

      {/* Heading */}
      <h2 className="page-heading">
        {isSearch ? "Search Results" : "Airing Anime 🚀"}
      </h2>

      <div className="airing-anime">
        {animeList?.map((anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
            <p>{anime.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Airing;
