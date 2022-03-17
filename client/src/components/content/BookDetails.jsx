import './styles/bookDetails.css'

const BookDetails = ({item, isLoading}) => {
    return (
        <div className="book-details">
            {item && !isLoading ?
            <>
                <div className="cover">
                    <img className="cover-img" src={item?.cover} alt={item?.title} />
                    <div className="buy">
                        <a target="_blank" href={item?.amazonLink} className="btn btn-primary">
                            <img src="https://img.icons8.com/color/25/000000/amazon.png"/>
                            BUY NOW
                        </a>
                    </div>
                </div>
                <div className="info">
                    <h1 className="title">
                        {item?.title}
                    </h1>
                    <h5 className="author">
                        By {item?.author}
                    </h5>
                    <div className="meta">
                        <img src="https://img.icons8.com/stickers/25/000000/star.png"/>
                        <span>{item.bookMeta?.rating} |</span>
                        <span>{item.bookMeta?.ratingCount} ratings</span>
                    </div>
                    <div className="more-details">
                        {item.details?.bookFormat && item.details?.numberOfPages &&
                            <p>
                                {`${item.details?.bookFormat}, ${item.details?.numberOfPages} pages`}
                            </p>
                        }
                        <p>
                            {item.details?.publishDate}
                        </p>
                        {item.details?.language && 
                            <p>
                                {`Language: ${item.details?.language}`}
                            </p>
                        }
                    </div>
                    <div className="description" dangerouslySetInnerHTML={{__html: `<h5>Description:</h5><p>${item?.description}</p>`}} />
                </div>
            </>
            :
                <>
                    <div className="cover blink">
                        <div className="cover-img"></div>
                        <div className="buy"></div>
                    </div>
                    <div className="info blink">
                        <h1 className="title">
                        </h1>
                        <h5 className="author">
                        </h5>
                        <div className="more-details">
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default BookDetails