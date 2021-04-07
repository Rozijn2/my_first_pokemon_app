import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Pokemon from './components/pokeCard';
import logo from './assets/pokemon_logo_PNG10.png'

function App() {
const [pokemons, setPokemons] = useState([]);
const [error, setError] = useState('');
const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon');
const [nextUrl, setNextUrl] = useState('');
const [previousUrl, setPreviousUrl] = useState('');

function handleClickNext() {
    setCurrentUrl(nextUrl);
    console.log(currentUrl);
}

    function handleClickPrevious() {
        setCurrentUrl(previousUrl);

    }

    useEffect(() => {
        setError('');
        async function fetchData() {
            try {
                const { data } = await axios.get(currentUrl);
                setPokemons(data.results);
                console.log(data.results);
                setNextUrl(data.next);
                setPreviousUrl(data.previous);
            } catch (e) {
                setError("Er is iets misgegaan met het ophalen van de data!");
                console.error(e);
            }
        }

        fetchData();
    }, [currentUrl])
  return (
      <>
          <div className="header">
              <img src={logo} alt="logo" className="logo"/>
          </div>
          <div className="button_box">
              <button type="button" className="button_1" onClick={handleClickPrevious}>Previous</button>
              <button type="button" className="button_1" onClick={handleClickNext}>Next</button>
          </div>
    <div className="card-container">
        {pokemons.map((pokemon) => {
            console.log(pokemon);
           //return <li key={pokemon.name}>{pokemon.name}</li>
            return (
                <Pokemon name={pokemon.name}/>
            )
        })}
    </div>
      </>
  );
}

export default App;
