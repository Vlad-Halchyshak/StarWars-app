import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../loader'
import { Movies } from './movies'
import { Species } from './species'
import { Starships } from './starships'
const CharactersDetails = () => {
    const { characterId } = useParams()

    const [character, setCharacter] = React.useState()
    console.log('character', character)

    const filmsId = character?.films.map((i) => {
        const films = i.split('/').filter(Boolean)
        const id = films[films.length - 1]
        return id
    })
    /* duplication of logic is very big sin :), but i dont have idea how to refactor for now  */
    const speciesId = character?.species.map((i) => {
        const species = i.split('/').filter(Boolean)
        const id = species[species.length - 1]
        return id
    })
    const starshipsId = character?.starships.map((i) => {
        const starshipId = i.split('/').filter(Boolean)
        const id = starshipId[starshipId.length - 1]
        return id
    })
    React.useEffect(() => {
        fetch(`https://swapi.dev/api/people/${characterId}/`)
            .then((res) => res.json())
            .then((data) => setCharacter(data))
    }, [])

    if (character === undefined) {
        return <Loading />
    }
    return (
        <div className="characterDetails">
            <table style={{ maxWidth: '400px' }}>
                <tr>
                    <td>Name:</td>
                    <td>{character?.name}</td>
                </tr>
                <tr>
                    <td>Species:</td>
                    <Species id={speciesId} />
                </tr>
                <tr>
                    <td>Movies:</td>
                    <Movies id={filmsId} />
                </tr>
                <tr>
                    <td>Spaceships:</td>
                    <Starships id={starshipsId[0] || ''} />
                </tr>
            </table>
        </div>
    )
}
export default CharactersDetails
