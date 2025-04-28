import React, { useState } from 'react'
import Popular from '../Components/Popular';
import Airing from '../Components/Airing';
import Upcoming from '../Components/Upcoming';
import { useGlobalContext } from '../context/global';

function Homepage() {

    const [rendered, setRendered] = useState('popular')

    const {
        handleSubmit,
        search,
        searchAnime,
        handleChange,
        getUpcomingAnime,
        getAiringAnime,
        getPopularAnime,
    } = useGlobalContext()

    const switchComponent = () => {
        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered} />
            case 'airing':
                return <Airing rendered={rendered} />
            case 'upcoming':
                return <Upcoming rendered={rendered} />
            default:
                return <Popular rendered={rendered} />
        }
    }

    return (
        <div>
            <header>
                <div className="logo">
                <h1>
                    {rendered === 'popular' || rendered === 'airing' || rendered === 'upcoming' ? (
                        <img src="/AniPeek-logo.png" alt="AniPeek Logo" style={{ height: '90px' }} />
                    ) : (
                        'AniPeek'
                    )}
                </h1>
                </div>
                <div className="search-container">
                    <div className="filter-btn popular-filter">
                        <button onClick={() => {
                            setRendered('popular')
                        }}>Popular <i className="fas fa-fire"></i></button>
                    </div>
                    <form action="" className="search-form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
                            <button type="submit">Search</button>
                        </div>
                    </form>
                    <div className="filter-btn airing-filter">
                        <button onClick={() => {
                            setRendered('airing')
                            getAiringAnime()
                        }}>Airing</button>
                    </div>
                    <div className="filter-btn upcoming-filter">
                        <button onClick={() => {
                            setRendered('upcoming')
                            getUpcomingAnime()
                        }}>Upcoming</button>
                    </div>
                </div>
            </header>
            {switchComponent()}
                {/* Footer */}
                <footer style={{
                    textAlign: 'center',
                    padding: '10px',
                    fontSize: '20px',
                    color: '#fff',
                    background: 'linear-gradient(85deg, rgba(255, 0, 0, 0.6), rgba(6, 204, 171, 0.6))',
                }}>
                Made with <span style={{ color: 'red' }}>❤</span> by 
                <a 
                    href="https://www.linkedin.com/in/badal-jha/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ marginLeft: '5px', textDecoration: 'none', color: '#0077b9', fontWeight: 'bold' }}
                >
                    Badal Jha
                </a>
            </footer>

        </div >
    )
}

export default Homepage