const Card = ({ item }) => {
    return (
        <>
            {item &&
                <div className="book">
                    <h3>{ item?.volumeInfo?.title }</h3>
                    <img src={ item?.volumeInfo?.imageLinks?.thumbnail } alt="" className="img"/>
                </div>
            }
        </>
    )
}

export default Card