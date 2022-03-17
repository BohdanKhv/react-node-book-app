import { Link } from 'react-router-dom'
import './styles/book.css'

const Book = ({ items, title, isLoading }) => {
    return (
        <section>
            <div className={`books ${items && items.length === 0 && ' d-none'}`}>
                <h2>{title}</h2>
                {items && items.map((item, index) => {
                    return (
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
            </div>
        </section>
    )
}

export default Book