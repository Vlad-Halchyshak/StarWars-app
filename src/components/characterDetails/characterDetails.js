import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../loader'
import { Movies } from './movies'
import { Species } from './species'
import { Starships } from './starships'

const CharactersDetails = () => {
    const { characterId } = useParams()
    const [character, setCharacter] = React.useState()

    const filmsId = character?.films.map((i) => {
        const films = i.split('/').filter(Boolean)
        return films[films.length - 1]
    })

    const speciesId = character?.species.map((i) => {
        const species = i.split('/').filter(Boolean)
        return species[species.length - 1]
    })
    const starshipsId = character?.starships.map((i) => {
        const starshipId = i.split('/').filter(Boolean)
        return starshipId[starshipId.length - 1]
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
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 650, ml: '35%' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {['Name:', 'Species:', 'Movies:', 'Spaceships:'].map(
                            (item) => {
                                return <TableCell>{item}</TableCell>
                            }
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            {character?.name}
                        </TableCell>
                        <TableCell align="left">
                            <Species id={speciesId} />
                        </TableCell>
                        <TableCell align="left">
                            {' '}
                            <Movies id={filmsId} />
                        </TableCell>
                        <TableCell align="left">
                            <Starships id={starshipsId[0] || ''} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default CharactersDetails
