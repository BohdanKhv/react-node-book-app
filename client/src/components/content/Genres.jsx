import { useEffect, useState } from "react"
import { getGenres } from "../../actions/books"
import './styles/genres.css'

const Genres = () => {

    const [genres, setGenres] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getGenres().then((res) => {setGenres(res); setIsLoading(false);})
    }, [])

    return (
        <section className="genres-list">
            <div className="container">
                <h2>All Genres</h2>
                {isLoading && 
                    [...Array(25).keys()].map((i) => (
                        <div className="link-card blink" style={{['--order']: `${i}`}} key={i}>
                            <a href='#'>
                            </a>
                        </div>
                    ))
                }
                {genres && genres.map((item, i) => {
                    return (
                        <div className="link-card">
                            <a href={`/genre/${item.name}`}>
                                <h5>
                                {item.name.slice(0,1).toUpperCase() + item.name.slice(1).replaceAll('-', ' ')}
                                </h5>
                                <h6>Books: {item.booksCount}</h6>
                            </a>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Genres