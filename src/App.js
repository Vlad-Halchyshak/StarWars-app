import './App.css'
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Characters } from './components/characters'
import CharactersDetails from './components/characterDetails/characterDetails'

function App() {
    return (
        <div className="App">
            <nav className="header">
                <div className="items">
                    <Link to="/characters">Characters</Link>

                    <Link to="/" style={{ marginLeft: '15px' }}>
                        Home
                    </Link>
                </div>
            </nav>

            <Routes>
                <Route exact path="/characters" element={<Characters />} />
                <Route
                    exact
                    path="/characters/:characterId"
                    element={<CharactersDetails />}
                />
            </Routes>
        </div>
    )
}

export default App
