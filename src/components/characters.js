/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Character } from './character'
import Loading from './loader'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Grid, Typography } from '@mui/material'

export const Characters = () => {
    const [dropdownValue, setDropdownValue] = useState('Filter by')
    const [episodeFilter, setEpisodeFilter] = useState(false)
    const [humanFilter, setHumanFilter] = useState(false)
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
    const filters = (e) => {
        switch (e) {
            case 'episode':
                setEpisodeFilter(true)
                setHumanFilter(false)
                break
            case 'human':
                setHumanFilter(true)
                setEpisodeFilter(false)
                break
            case 'age':
                setPeople(findAge)
                setHumanFilter(false)
                setEpisodeFilter(false)
                break
            default:
        }
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

    if (!people === undefined) {
        return <Loading />
    }
    return (
        <div>
            <Typography variant="h3" sx={{ mt: 2 }}>
                Characters
            </Typography>

            <FormControl sx={{ width: 250, mt: 5 }} variant="outlined">
                <InputLabel>Filter by</InputLabel>
                <Select value={dropdownValue} onChange={handleChange}>
                    <MenuItem
                        value={'Episode 4. A New Hope'}
                        onClick={(e) => filters('episode')}
                    >
                        {' '}
                        Episode 4. A New Hope
                    </MenuItem>
                    <MenuItem
                        value={'Only Human'}
                        onClick={() => filters('human')}
                    >
                        {' '}
                        Only Human
                    </MenuItem>
                    <MenuItem
                        value={' Born in 30BBY-5BBY'}
                        onClick={() => filters('age')}
                    >
                        Born in 30BBY-5BBY
                    </MenuItem>
                </Select>
            </FormControl>
            <Grid item sx={{ mt: 5 }}>
                {!episodeFilter && !humanFilter
                    ? people?.map((person) => {
                          const personUrlParts = person.url
                              .split('/')
                              .filter(Boolean)
                          const personId =
                              personUrlParts[personUrlParts.length - 1]

                          return (
                              <div
                                  key={personId}
                                  style={{ margin: '16px 0 0' }}
                              >
                                  <Link
                                      to={`/characters/${personId}`}
                                      className="characters"
                                  >
                                      <p>{person?.name}</p>
                                  </Link>
                              </div>
                          )
                      })
                    : ''}
                {episodeFilter &&
                    filmNewHope?.characters?.map((character) => {
                        const episodeUrlParts = character
                            .split('/')
                            .filter(Boolean)
                        const episodeId =
                            episodeUrlParts[episodeUrlParts.length - 1]
                        return <Character id={episodeId} key={episodeId} />
                    })}
                {humanFilter &&
                    species?.people?.map((specie) => {
                        const characterUrlParts = specie
                            ?.split('/')
                            .filter(Boolean)
                        const speciesId =
                            characterUrlParts[characterUrlParts.length - 1]
                        return (
                            <Character key={`${specie}-human`} id={speciesId} />
                        )
                    })}
            </Grid>
        </div>
    )
}
