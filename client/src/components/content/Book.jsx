import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/book.css'

const Book = ({ items, title, isLoading }) => {

    const [showGenreCount, setShowGenreCount] = useState(10)
    const loadMore = () => {
        setShowGenreCount(showGenreCount + 10)
    }

    return (
        <section>
            <div className={`books ${items && items.length === 0 && ' d-none'}`}>
                <h2>{title}</h2>
                {items && items.map((item, index) => {
                    return (
                        showGenreCount >= index &&
                            <div className="book" key={`book-${item.id}`}>
                                <h3>{ item?.title }</h3>
                                <Link to={`/book/show/${item.id}`}>
                                    <img src={ item?.cover } alt={ item?.title } className="img"/>
                                </Link>
                            </div>
                    )
                })}
                {isLoading && 
                    [...Array(10).keys()].map((i) => {
                        return (
                            <div className="book blink" style={{['--order']: `${i}`}} key={`card-loading-${i}`}>
                                <h3></h3>
                                <div className="img"></div>
                            </div>
                        )
                    })
                }
                {!isLoading && items && showGenreCount < items.length &&
                    <div className="book load-more" onClick={loadMore}>
                        <h3>
                            Show More
                        </h3>
                    </div>
                }
            </div>
        </section>
    )
}

export default Book