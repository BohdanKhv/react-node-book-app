import { Link } from 'react-router-dom'
import './styles/bookDisplay.css'

const BookDisplay = () => {
    return (
        <section className="book-display">
            <div className="container">
                <div className="book-display-wrapper">
                    <Link className="cover" to={`/book/show/2342342`}>
                            <div className="book-meta">
                                <span>
                                    <img src="https://img.icons8.com/fluency/20/000000/star.png" alt="star" />
                                    {/* {item.bookMeta?.rating} */}4.2
                                </span>
                                <span>
                                    <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/20/000000/external-rating-feedback-those-icons-lineal-color-those-icons-1.png" alt="star" />
                                    {/* {item.bookMeta?.ratingCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}465
                                </span>
                            </div>
                        <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1628192520l/58107989.jpg" alt="" className="img"/>
                    </Link>
                    <div className="info">
                        <div className="details">
                            <div className="title">
                                <h2>Most Read Book In Science Fiction This Week</h2>
                            </div>
                            <div className="description">
                                <h3>Pixels of You</h3>
                                <p>By Ananth HirshYuko OtaJ.R. Doyle</p>
                                <p>Paperback 172 pages</p>
                                <p>Published February 8th 2022 by Harry N. Abrams</p>
                            </div>
                        </div>
                        <div className="actions">
                            <Link to='/search' className="btn btn-primary">More Details</Link>
                            <Link to='/genre/science-fiction' className="btn">Science Fiction</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookDisplay