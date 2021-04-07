import React, {useState, useEffect} from 'react';
import axios from 'axios';


function Pokemon({name}) {
    const [singlePokemon, setSinglePokemon] = useState({});
    const [moves, setMoves] = useState([]);
    const [weight, setWeight] = useState([]);
    const [sprites, setSprites] = useState([]);

    useEffect(() => {
        async function fetchOneData(){
            try {
         const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
         setSinglePokemon(data);
         setMoves(data.moves.length);
         setWeight(data.weight);
         setSprites(data.sprites.front_default);
            } catch (e) {
                console.error(e)
            }
        }
        fetchOneData();

        },[name])

    return (
        <div className="card">
            {singlePokemon && <h3 key={singlePokemon.name}>{singlePokemon?.name}</h3>}
            <img src={sprites}/>
            <p>moves: {moves}</p>
            <p>weight: {weight}</p>
        </div>
    )
}

export default Pokemon;