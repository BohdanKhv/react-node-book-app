const Card = ({ item }) => {
    return (
        <div className="card">
            <img src={ item.volumeInfo.imageLinks.thumbnail } alt="" className="img" />
            <div className="info">
                <h3>{ item?.volumeInfo?.title }</h3>
                <div>
                    <div className="detail">
                        <p>Author:</p>
                        <p>{ item?.volumeInfo?.authors.map((e, i, arr)=> i != arr.length-1 ? e + ', ' : e) }</p>
                    </div>
                    <div className="detail">
                        <p>Categorie:</p>
                        <p>{ item?.volumeInfo?.categories }</p>
                    </div>
                    {item?.saleInfo?.saleability != "NOT_FOR_SALE" ?
                        <div className="detail">
                            {console.log(item)}
                            <p>Price:</p>
                            <p>$ { item?.saleInfo?.listPrice?.amount +''+ item?.saleInfo?.listPrice?.currencyCode }</p>
                        </div>
                        :
                        <div className="detail">
                            {console.log(item)}
                            <p>Price:</p>
                            <p>{item?.saleInfo?.saleability.replaceAll('_', ' ') }</p>
                        </div>
                    }
                </div>
                {item?.saleInfo?.saleability != "NOT_FOR_SALE" &&
                    <a target="_blank" className="btn btn-info" href={item?.saleInfo?.buyLink}>Buy Now</a>
                }
            </div>
        </div>
    )
}

export default Card