import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { getBooks } from "../actions/books"
import { Book } from "../components"
import './styles/genreView.css'

const GenreView = () => {

    const params = useParams()
    const [newReleases, setNewReleases] = useState(null)
    const [newReleasesisLoading, setNewReleasesisLoading,] = useState(false)

    const [mostRead, setMostRead] = useState(null)
    const [mostReadisLoading, setMostReadisLoading] = useState(false)

    useEffect(() => {
        if(params.id) {
            setNewReleasesisLoading(true)
            setMostReadisLoading(true)
            getBooks(params.id, 'new_releases').then((res) => {setNewReleases(res); setNewReleasesisLoading(false)})
            getBooks(params.id, 'most_read').then((res) => {setMostRead(res); setMostReadisLoading(false)})
        }
    }, [])

    return (
        <div className="genre-view">
            <div className="container">
                <h1 className="genre-title">{params.id && params.id.replaceAll('-', ' ').toUpperCase()}</h1>
                <hr />
                <Book items={newReleases} title={'New Releases'} isLoading={newReleasesisLoading}/>
                <Book items={mostRead} title={'Most Read This Week'} isLoading={mostReadisLoading}/>
            </div>
        </div>
    )
}

export default GenreView