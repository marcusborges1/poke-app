import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default class PokemonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      sprite: '',
      selectedTypes: [],
      selectedEvolutions: [],
      typeOptions: [],
      pokemonOptions: [],
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    if (id) {
      const data = await this.fetchCurrentPokemon(id);
      this.fillFormWithCurrentPokemon(data);
    }
    await this.fillFormOptions();
  }

  handleTypesChange = (selectedTypes) => {
    this.setState({ selectedTypes });
  }

  handleEvolutionsChange = (selectedEvolutions) => {
    this.setState({ selectedEvolutions });
  }

  fetchFromAPI = async (resource) => {
    const url = `http://localhost:4000/v1/${resource}`;
    const { data } = await axios.get(url);
    return data;
  }

  fetchCurrentPokemon = async (id) => {
    const url = `http://localhost:4000/v1/pokemon/${id}`;
    const { data } = await axios.get(url);
    return data;
  }

  fillFormOptions = async() => {
    this.setState({ typeOptions: await this.fetchFromAPI('types') });
    this.setState({ pokemonOptions: await this.fetchFromAPI('pokemon') });
  }

  fillFormWithCurrentPokemon = async(data) => {
    const { name, types } = data;
    const evolutions = data.evolves_to;

    this.setState({
      name,
      selectedTypes: types,
      selectedEvolutions: evolutions,
    });
  }

  getTypeIds = () => this.state.selectedTypes.map(type => type.id);
  
  getEvolutionIds = () => this.state.selectedEvolutions.map(evolution => evolution.id);

  updatePokemon = async (id) => {
    const url = `http://localhost:4000/v1/pokemon/${id}`;
    try {
      await axios.put(url, {
        name: this.state.name,
        type_ids: this.getTypeIds(),
        evolution_ids: this.getEvolutionIds(),
        sprite: this.state.sprite,
      });
      alert(`${this.state.name} updated sucessfully.`);
      this.props.history.push(`/pokemon/${id}`);
    } catch (e) {
      alert('Error!' + e.message)
    }
  }

  createPokemon = async () => {
    const url = 'http://localhost:4000/v1/pokemon';
    try {
      const { data } = await axios.post(url, {
        name: this.state.name,
        type_ids: this.getTypeIds(),
        evolution_ids: this.getEvolutionIds(),
        sprite: this.state.sprite,
      });
      alert(`${data.name} created sucessfully.`);
      this.props.history.push(`/pokemon/${data.id}`);
    } catch (e) {
      alert('Error!' + e.message);
    }
  }

  savePokemon = async (event) => {
    event.preventDefault();
    const { id } = this.props.match.params;

    if (id) {
      this.updatePokemon(id);
    } else {
      this.createPokemon();
    }
  }

  renderProperTitle = () => {
    return this.props.match.params.id ? <h5>Edit Pokémon</h5> : <h5>Create Pokémon</h5>;
  }

  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            { this.renderProperTitle() }
          </div>
          <div className="card-body">
            <form onSubmit={this.savePokemon}>
              <div>
                <label>Name:</label>
                <input 
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </div>
              <br />
              <div>
                <label>Types:</label>
                <Select
                  isSearchable={true}
                  options={this.state.typeOptions} 
                  isMulti={true}
                  value={this.state.selectedTypes}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  onChange={this.handleTypesChange}
                />
              </div>
              <br />
            
              <div>
                <label>Evolves to:</label>
                <Select
                  isSearchable={true}
                  options={this.state.pokemonOptions} 
                  isMulti={true}
                  value={this.state.selectedEvolutions}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  onChange={this.handleEvolutionsChange}
                />
              </div>
              <br />

              <div>
                <label>Sprite:</label>
                <input 
                  type="file" 
                  name="sprite" 
                  accept="image/*"
                  onChange={(e) => { this.setState({ sprite: e.target.files[0] }) }}
                />
              </div>
              <br/>

              <input 
                type="submit"
                onClick={this.savePokemon}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}