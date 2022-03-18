import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles/cardsRow.css'

const CardsRow = ({ items, title }) => {

    const booksRowRef = useRef()

    const onWheel = (e) => {
        if (e.deltaY > 0) {
            booksRowRef.current.scrollLeft  += 100
        } else {
            booksRowRef.current.scrollLeft  -= 100
        }
    }

    return (
        <section className="cards-row-wrapper">
            <h2>{title}</h2>
            <div 
                className="books-row" 
                onWheel={onWheel} 
                ref={booksRowRef}>
                {items && items.map((item, index) => {
                    return (
                        <div className="book" key={`book-${title}-${item.id}`}>
                            <h3>{ item?.title }</h3>
                            <Link to={`/book/show/${item.id}`}>
                                <img src={ item?.cover } alt={ item?.title } className="img"/>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default CardsRow