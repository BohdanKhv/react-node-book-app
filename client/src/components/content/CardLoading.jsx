import { useEffect } from "react"
import './styles/card.css'

const CardLoading = ({isLoading}) => {

    return (
        <>
            {
                [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div className="card blink" style={{['--order']: `${i}`}} key={i}>
                        <div className="img blink"> </div>
                        <div className="info blink" style={{['--order']: `${i}`}}>
                            <h3></h3>
                            <h3></h3>
                            <h3></h3>
                            <h3></h3>
                        </div>
                    </div>
                ))
            }
        </>
    )

}

export default CardLoading