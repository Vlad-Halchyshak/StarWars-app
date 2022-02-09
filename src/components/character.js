import React from 'react'
import { Link } from 'react-router-dom'
import Loading from './loader'
export const Character = ({ id }) => {
    const [people, setPeople] = React.useState()
    React.useEffect(() => {
        fetch(`https://swapi.dev/api/people/${id}/`)
            .then((res) => res.json())
            .then((data) => setPeople(data))
    }, [])

    if (!people) {
        return <Loading />
    }
    return (
        <Link to={`/characters/${id}`}>
            <p variant="h6">{people?.name}</p>
        </Link>
    )
}
