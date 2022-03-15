import { CardLoading, Card } from '../'
import './styles/displayRow.css'

const DisplayRow = ({isLoading, foundBooks}) => {
    return (
        <section className="display-row">
            { isLoading ?
                    <div className="cards">
                        <CardLoading isLoading={isLoading} />
                    </div>
            : foundBooks &&
                <>
                    <h2>Found {foundBooks.totalItems.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Books</h2>
                    <div className="cards">
                        {foundBooks.items.sort((a, b) => (b?.saleInfo?.listPrice ? b?.saleInfo?.listPrice?.amount : 0) - (a?.saleInfo?.listPrice ? a?.saleInfo?.listPrice?.amount : 0)).map((item, index) => {
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