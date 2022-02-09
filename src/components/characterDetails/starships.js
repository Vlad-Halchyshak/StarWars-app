import React from 'react'
export const Starships = ({ id }) => {
    const [starship, setStarship] = React.useState({})

    React.useEffect(() => {
        fetch(`https://swapi.dev/api/starships/${id}/`)
            .then((res) => res.json())
            .then((data) => setStarship(data))
    }, [])
    return <div>{starship?.name || 'no information'}</div>
}
