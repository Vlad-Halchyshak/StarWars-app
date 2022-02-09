/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Character } from './character'
import { Species } from './characterDetails/species'
import Loading from './loader'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export const Characters = () => {
    const [dropdownValue, setDropdownValue] = useState('Filter by')
    const [episodeFilter, setEpisodeFilter] = useState(false)
    const [humanFilter, setHumanFilter] = useState(false)
    const [ageFilter, setAgeFilter] = useState(false)
    const [people, setPeople] = useState()
    const [filmNewHope, setFilmNewHope] = useState()
    const [species, setSpecies] = useState()

    const findAge = people?.filter((i) => {
        const selectNumbers = i.birth_year.slice(0, 2)
        return selectNumbers < 30
    })

    const handleChange = (event) => {
        setDropdownValue(event.target.value)
    }
    const applyAgeFilter = () => {
        setPeople(findAge)
        setEpisodeFilter(false)
        // setHumanFilter(false)
    }
    const applyHumanFilter = () => {
        setHumanFilter(true)
        setPeople(null)
        setEpisodeFilter(false)
    }
    const applyEpisodeFilter = () => {
        setEpisodeFilter(true)
        setHumanFilter(false)
    }
    React.useEffect(() => {
        fetch('https://swapi.dev/api/people/')
            .then((res) => res.json())
            .then((data) => setPeople(data.results))
    }, [])
    React.useEffect(() => {
        fetch('https://swapi.dev/api/films/1/')
            .then((res) => res.json())
            .then((data) => setFilmNewHope(data))
    }, [])
    React.useEffect(() => {
        fetch('https://swapi.dev/api/species/1/')
            .then((res) => res.json())
            .then((data) => setSpecies(data))
    }, [])

    if (people === undefined) {
        return <Loading />
    }
    return (
        <div>
            <h1>Characters</h1>
            <div class="dropdown">
                <FormControl sx={{ width: 250 }}>
                    <InputLabel id="demo-simple-select-label">
                        Filter by
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dropdownValue}
                        onChange={handleChange}
                    >
                        <MenuItem
                            value={'Episode 4. A New Hope'}
                            onClick={() => applyEpisodeFilter()}
                        >
                            {' '}
                            Episode 4. A New Hope
                        </MenuItem>
                        <MenuItem
                            value={'Only Human'}
                            onClick={() => applyHumanFilter()}
                        >
                            {' '}
                            Only Human
                        </MenuItem>
                        <MenuItem
                            value={' Born in 30BBY-5BBY'}
                            onClick={() => applyAgeFilter()}
                        >
                            Born in 30BBY-5BBY
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>

            {!episodeFilter &&
                people?.map((person) => {
                    const personUrlParts = person.url.split('/').filter(Boolean)
                    const personId = personUrlParts[personUrlParts.length - 1]
                    console.log('personId', personId)
                    return (
                        <div key={personId} style={{ margin: '16px 0 0' }}>
                            <Link
                                to={`/characters/${personId}`}
                                className="characters"
                            >
                                <p>{person?.name}</p>
                            </Link>
                        </div>
                    )
                })}
            {episodeFilter &&
                filmNewHope?.characters?.map((character) => {
                    const characterUrlParts = character
                        .split('/')
                        .filter(Boolean)
                    const characterId =
                        characterUrlParts[characterUrlParts.length - 1]
                    return <Character id={characterId} key={characterId} />
                })}
            {humanFilter &&
                species?.people?.map((specie) => {
                    const characterUrlParts = specie?.split('/').filter(Boolean)
                    const speciesId =
                        characterUrlParts[characterUrlParts.length - 1]
                    return <Character key={`${specie}-human`} id={speciesId} />
                })}
        </div>
    )
}
