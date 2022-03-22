import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles/cardsRow.css'

const CardsRow = ({ items, title, isLoading }) => {

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
            <div className="container">
                <h2>{title}</h2>
                <div 
                    className="books-row" 
                    onWheel={onWheel} 
                    ref={booksRowRef}>
                    {!isLoading ? 
                        items && items.map((item, index) => {
                            return (
                                <div className="book" key={`book-${title}-${item.id}`}>
                                    <div className="title-wrapper">
                                        <div className="title">
                                            <h3>{ item?.title }</h3>
                                        </div>
                                    </div>
                                    <Link to={`/book/show/${item.id}`}>
                                        <img src={ item?.cover } alt={ item?.title } className="img"/>
                                    </Link>
                                </div>
                            )
                        })
                    : [...Array(10).keys()].map((i) => {
                            return (
                                <div className="book blink" style={{['--order']: `${i}`}} key={`card-loading-${i}`}>
                                    <div className="title-wrapper">
                                        <div className="title">
                                            <h3></h3>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="img"></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default CardsRow