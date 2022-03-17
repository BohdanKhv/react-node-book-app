import './styles/book.css'
import { Card } from '../'

const DisplayRow = ({ isLoading, foundBooks }) => {
    return (
        <section className="display-row">
            { isLoading ?
                    <div className="books">
                    {[...Array(10).keys()].map((i) => {
                        return (
                            <div className="book blink" style={{['--order']: `${i}`}} key={`card-loading-${i}`}>
                                <h3></h3>
                                <div className="img"></div>
                            </div>
                        )
                    })}
                    </div>
            : foundBooks &&
                <>
                    <div className="books">
                        <h2>Found {foundBooks?.totalItems.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Books</h2>
                        {foundBooks?.items.sort((a, b) => (b?.saleInfo?.listPrice?.amount ? b?.saleInfo?.listPrice?.amount : 0) - (a?.saleInfo?.listPrice?.amount ? a?.saleInfo?.listPrice?.amount : 0)).map((item, index) => {
                            return (
                                <Card key={`search-result-${index}`} item={item}/>
                            )
                        })}
                    </div>
                </>
            }
        </section>
    )
}

export default DisplayRow