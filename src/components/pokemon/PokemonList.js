import React, { Component } from 'react';
import axios from 'axios';
import Search from 'react-search';

import PokemonCard from './PokemonCard';

export default class PokemonList extends Component {
  state = {
    pokemons: [],
  };

  componentDidMount = async () => {
    const { data } = await axios.get('http://localhost:4000/v1/pokemon');
    this.setState({ pokemons: data });
  }

  getAsyncPokemons = async (searchName) => {
    const url = `http://localhost:4000/v1/pokemon?name=${searchName}`;
    const { data } = await axios.get(url);
    try {
      let foo = data.map((pokemon) => { return { id: pokemon.id, name: pokemon.name }})
      this.setState({ pokemons: data });
    } catch (e) {
      alert('Error!' + e);
    }
  }
  
  render() {
    return (
      <React.Fragment>
        { this.state.pokemons ? (
          <div className="row">
            <div className="rol">
              <Search
                items={this.state.pokemons}
                getItemsAsync={this.getAsyncPokemons}
                placeholder="Search a pokemon"
              />
            </div>
            <div className="row">
              {this.state.pokemons.map(pokemon => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  spriteUrl={pokemon.sprite_url}
                />
              ))}
            </div>
          </div>) : (
            <h1>Loading Pokemon</h1>
          )
        }
      </React.Fragment>
    )
  }
}