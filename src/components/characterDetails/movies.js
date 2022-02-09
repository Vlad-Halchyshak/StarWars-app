import React from 'react'
import Loading from '../loader'

export const Movies = ({ id }) => {
    const [movie, setMovie] = React.useState()

    const episodes = movie
        ?.map((i) => {
            return i.episode_id.toString()
        })
        .filter((r) => id.includes(r))
        .sort()
        .join(',')

    React.useEffect(() => {
        fetch(`https://swapi.dev/api/films/`)
            .then((res) => res.json())
            .then((data) => setMovie(data.results))
    }, [])

    if (!movie) {
        return <Loading />
    }

    return <div>{episodes}</div>
}
