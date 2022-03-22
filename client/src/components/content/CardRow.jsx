import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles/cardRow.css'

const BestBook = ({ title, items }) => {
    const booksRowRef = useRef()

    const onWheel = (e) => {
        if (e.deltaY > 0) {
            booksRowRef.current.scrollLeft  += 100
        } else {
            booksRowRef.current.scrollLeft  -= 100
        }
    }

    return (
        <section className="best-book">
            <div className="container">
                <h2>{title}</h2>
                <div 
                    className="years"
                    onWheel={onWheel} 
                    ref={booksRowRef}
                >
                    {items[0].name ? items.map(i => {
                        return (
                            <Link 
                            key={`${i.name}-card-row`} 
                            className="year"
                            to={`/genre/${i.name}`}
                            >
                                <h5>
                                    {i.name.slice(0,1).toUpperCase() + i.name.slice(1).replaceAll('-', ' ')}
                                </h5>
                            </Link>
                        )
                    })
                    : items &&
                        items.map(i => {
                            return (
                                <Link 
                                key={`${i}-card-row`} 
                                className="year"
                                to={`/bestbook/${i}`}
                                >
                                    <div className="img"></div>
                                    <h5>
                                        {i + ' AWARDS'}
                                    </h5>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default BestBook