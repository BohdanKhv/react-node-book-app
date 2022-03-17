import './styles/book.css'

const Book = ({ items, title, isLoading }) => {
    return (
        <section>
            <div className={`books ${items && items.length === 0 && ' d-none'}`}>
                <h2>{title}</h2>
                {items && items.map((item, index) => {
                    return (
                        <div className="book" key={`card-new-release-${index}`}>
                            <h3>{ item?.title }</h3>
                            <img src={ item?.cover } alt={ item?.title } className="img"/>
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
            </div>
        </section>
    )
}

export default Book