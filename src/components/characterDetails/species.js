import React from 'react'

export const Species = ({ id }) => {
    const [species, setSpecies] = React.useState()

    React.useEffect(() => {
        fetch(`https://swapi.dev/api/species/${id.toString()}/`)
            .then((res) => res.json())
            .then((data) => setSpecies(data))
    }, [])

    return <div>{species?.name || 'no information'}</div>
}
