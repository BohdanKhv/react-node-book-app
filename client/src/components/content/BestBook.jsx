import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles/bestBook.css'

const years = ['2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011']

const BestBook = () => {

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
                <h2>Best Book Of The Year</h2>
                <div 
                    className="years"
                    onWheel={onWheel} 
                    ref={booksRowRef}
                >
                    {years.map(i => {
                        return (
                            <Link 
                            key={`${i}-awards`} 
                            className="year"
                            to={`/bestbook/${i}`}
                            >
                                <div className="img"></div>
                                <h5>
                                    {i} AWARDS
                                </h5>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default BestBook