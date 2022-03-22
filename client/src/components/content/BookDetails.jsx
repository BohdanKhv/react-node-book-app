import './styles/bookDetails.css'

const BookDetails = ({item, isLoading}) => {
    return (
        <div className="container">
            <section className="book-details">
                {item && !isLoading ?
                <>
                    <div className="cover">
                        <img className="cover-img" src={item.cover ? item?.cover : "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/nophoto/book/111x148._SX475_.png"} alt={item?.title} />
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
                            {[...Array(5).keys()].map((i) => {
                                return (
                                    <img key={`rating-star-${i}`} src={
                                    i+1 === Math.round(+item.bookMeta?.rating) ?
                                        +item.bookMeta?.rating % 1 >= 0.5 ?
                                            "https://img.icons8.com/color/20/000000/star-half.png"
                                        :
                                            "https://img.icons8.com/fluency/20/000000/star.png"
                                    : i < Math.round(+item.bookMeta?.rating) ?
                                        "https://img.icons8.com/fluency/20/000000/star.png"
                                    : ''
                                    }/>
                                )
                            })}
                            <span>{item.bookMeta?.rating} |</span>
                            <span>{item.bookMeta?.ratingCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ratings</span>
                        </div>
                        <div className="more-details">
                            {(item.details?.bookFormat || item.details?.numberOfPages )&&
                                <p>
                                    {item.details?.bookFormat} <b>{`${item.details?.numberOfPages} pages`}</b>
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
            </section>
        </div>
    )
}

export default BookDetails