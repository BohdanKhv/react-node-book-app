import { useEffect, useState } from "react"
import { getGenres } from "../../actions/books"
import './styles/genres.css'

const Genres = () => {

    const [genres, setGenres] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showGenreCount, setShowGenreCount] = useState(10)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        setIsLoading(true)
        getGenres().then((res) => {setGenres(res); setIsLoading(false);})
    }, [])

    const loadMore = () => {
        setShowGenreCount(showGenreCount + 10)
    }

    const genreOrder = ['fiction', '40k', 'space', 'novella', 'futurism', 'futuristic', 'artificial-intelligence'];

    return (
        <section className="genres-list">
            <div className="container">
                <div className="title">
                    <h2>Genres</h2>
                    <input type="text" placeholder="Find genre" value={filter} onChange={(e) => {setFilter(e.currentTarget.value)}} />
                </div>
                {isLoading && 
                    [...Array(12).keys()].map((i) => (
                        <div className="link-card blink" style={{['--order']: `${i}`}} key={i}>
                            <a href='#'>
                            </a>
                        </div>
                    ))
                }
                {genres && genres.sort(a => genreOrder.includes(a.name.toLowerCase(), 0) ? -1 : 1).map((item, i) => {
                    return (
                        showGenreCount >= i && filter === '' ?
                            <div className="link-card" key={`genra-${i}`}>
                                <a href={`/genre/${item.name}`}>
                                    <h5>
                                        {item.name.slice(0,1).toUpperCase() + item.name.slice(1).replaceAll('-', ' ')}
                                    </h5>
                                    <h6>Books: {item.booksCount}</h6>
                                </a>
                            </div>
                        : filter !== '' && item.name.toLowerCase().includes(filter.toLowerCase()) &&
                            <div className="link-card" key={`genra-${i}`}>
                                <a href={`/genre/${item.name}`}>
                                    <h5>
                                        {item.name.slice(0,1).toUpperCase() + item.name.slice(1).replaceAll('-', ' ')}
                                    </h5>
                                    <h6>Books: {item.booksCount}</h6>
                                </a>
                            </div>
                    )
                })}
                {!isLoading && filter === '' && genres && showGenreCount < genres.length &&
                    <div className="link-card" onClick={loadMore}>
                        <div className="load-more">
                            <h5>
                                Show More
                            </h5>
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default Genres