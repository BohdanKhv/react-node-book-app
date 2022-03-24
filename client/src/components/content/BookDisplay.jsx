import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBook } from '../../actions/books'
import './styles/bookDisplay.css'

const BookDisplay = ({ item, randomGenre }) => {

    const [ book, setBook ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)

    useEffect(() => {
        if(item) {
            setIsLoading(true)
            getBook(item.id).then((res) => {
                setBook(res)
                setIsLoading(false)
            })
        }
    }, [item])

    return (
        <section className="book-display">
            <div className="container">
                {!isLoading && book ?
                <div className="book-display-wrapper">
                    <Link className="cover" to={`/book/show/${book.id}`}>
                            <div className="book-meta">
                                <span>
                                    <img src="https://img.icons8.com/fluency/20/000000/star.png" alt="star" />
                                    {book.bookMeta?.rating}
                                </span>
                                <span>
                                    <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/20/000000/external-rating-feedback-those-icons-lineal-color-those-icons-1.png" alt="star" />
                                    {book.bookMeta?.ratingCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                            </div>
                        <img src={book.cover} alt={book.title} className="img"/>
                    </Link>
                    <div className="info">
                        <div className="details">
                            <div className="title">
                                <h2>Most Read Book In {randomGenre.replaceAll('-', ' ')} This Week</h2>
                            </div>
                            <h3>{book.title}</h3>
                            <div className="description">
                                <p>{`By ${book.author}`}</p>
                                {book.details.numberOfPages &&
                                <>
                                    <p>{book.details.bookFormat} {book.details.numberOfPages} pages</p>
                                    <p>{book.details.publishDate}</p>
                                </>
                                }
                                <p>
                                    [ {book.genres.map((item, i) => {
                                            return (
                                                    i <= 2 ?
                                                        `${item.name}${i < 2 ? ', ' : '' }`
                                                    : ''
                                                )
                                        })
                                    } ]
                                </p>
                                <div className="description" dangerouslySetInnerHTML={{__html: `<p>${book?.description}</p>`}} />
                            </div>
                        </div>
                        <div className="actions">
                            <a target="_blank" href={book.amazonLink} className="btn btn-primary">Buy</a>
                            <Link to={`/book/show/${book.id}`} className="btn">More Details</Link>
                        </div>
                    </div>
                </div>
                :
                <div className="book-display-wrapper blink"></div>
                }
            </div>
        </section>
    )
}

export default BookDisplay