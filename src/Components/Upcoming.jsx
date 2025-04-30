import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useGlobalContext } from '../context/global';

function Upcoming({ rendered }) {
  const { upcomingAnime, isSearch, searchResults } = useGlobalContext();

  const animeList = !isSearch && rendered === 'upcoming' ? upcomingAnime : searchResults;

  return (
    <div>
      {/* Show Sidebar only when rendered is 'popular' */}
      {rendered === 'popular' && !isSearch && <Sidebar />}

      {/* Heading */}
      <h2 className="page-heading">
        {isSearch ? "Search Results" : "Upcoming Anime 📅"}
      </h2>

      <div className="upcoming-anime">
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

export default Upcoming;
