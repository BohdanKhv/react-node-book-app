import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/book.css'

const Book = ({ items, title, isLoading, isSearch }) => {

    const [showGenreCount, setShowGenreCount] = useState(20)
    const loadMore = () => {
        setShowGenreCount(showGenreCount + 20)
    }

    return (
        <section>
            <div className={`books ${items && items.length === 0 && ' d-none'}`}>
                {items && <h2>{title}</h2> }
                {!isLoading && items  && items.map((item, index) => {
                    return (
                        showGenreCount >= index &&
                            <div className="book" key={`book-${item.id}`}>
                                <div className="title-wrapper">
                                    <div className="title">
                                        <h3>{ item?.title }</h3>
                                        {item.author &&
                                            <h5>By <b>{ item?.author }</b></h5>
                                        }
                                        {item?.details?.publishDate &&
                                            <h5>Published: <b>{ item?.details?.publishDate}</b></h5>
                                        }
                                    </div>
                                </div>
                                <Link to={`/book/show/${item.id}`}>
                                    {item.bookMeta ?
                                        <div className="book-meta">
                                            <span>
                                                <img src="https://img.icons8.com/fluency/20/000000/star.png" alt="star" />
                                                {item.bookMeta?.rating}
                                            </span>
                                            <span>
                                                <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/20/000000/external-rating-feedback-those-icons-lineal-color-those-icons-1.png" alt="star" />
                                                {item.bookMeta?.ratingCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            </span>
                                            {item.details.publishDate &&
                                            <span>
                                                <img src="https://img.icons8.com/color/30/000000/tear-off-calendar--v1.png" alt="star" />
                                                {item.details.publishDate}
                                            </span>
                                            }
                                            {item.details.numberOfPages && +item.details.numberOfPages > 0 ?
                                                <span>
                                                    <img src="https://img.icons8.com/color/30/000000/single-page-mode.png" alt="star" />
                                                    {item.details.numberOfPages}
                                                </span>
                                                :
                                                null
                                            }
                                        </div>
                                        : item.category &&
                                        <div className="book-meta">
                                            <span className="category">
                                                <img src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/20/000000/external-win-friendship-wanicon-lineal-color-wanicon.png" alt="star" />
                                                {item.category}
                                            </span>
                                        </div>
                                    }
                                    <img src={ item?.cover } alt={ item?.title } className="img"/>
                                </Link>
                            </div>
                    )
                })}
                {isLoading ? 
                    [...Array(20).keys()].map((i) => {
                        return (
                            <div className="book blink" style={{['--order']: `${i}`}} key={`card-loading-${i}`}>
                                <h3></h3>
                                <div className="img"></div>
                            </div>
                        )
                    })
                    :
                    null
                }
                {!isLoading && !isSearch && items && showGenreCount < items.length &&
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