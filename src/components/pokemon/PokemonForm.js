import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default class PokemonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      index: '',
      sprite: '',
      typeIds: [],
      typeOptions: [],
      pokemonOptions: [],
      evolutionIds: [],
    };
  }

  handleTypesChange = (selectedTypes) => {
    this.setState({ typeIds: selectedTypes.map((type) => type.id) });
  }

  handleEvolutionsChange = (selectedEvolutions) => {
    this.setState({ evolutionIds: selectedEvolutions.map((evolution) => evolution.id) });
  }

  componentDidMount = async () => {
    this.setState({ typeOptions: await this.fetchFromAPI('types') });
    this.setState({ pokemonOptions: await this.fetchFromAPI('pokemon') });
  }

  fetchFromAPI = async (resource) => {
    const url = `http://localhost:4000/v1/${resource}`;
    const { data } = await axios.get(url);
    return data;
  }

  savePokemon = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:4000/v1/pokemon';
    try {
      const { data } = await axios.post(url, {
        name: this.state.name,
        type_ids: this.state.typeIds,
        evolution_ids: this.state.evolutionIds,
        sprite: this.state.sprite,
      });
      alert(`${data.name} created sucessfully.`);
      this.props.history.push(`/pokemon/${data.id}`);
    } catch (e) {
      console.log(e)
      alert('Error!' + e.message);
    }
  }

  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <h5>Create Pokemon</h5>
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
                <label>Index:</label>
                <input 
                  value={this.state.index}
                  onChange={e => this.setState({ index: e.target.value })}
                />
              </div>
              <br />
              
              <div>
                <label>Types:</label>
                <Select
                  isSearchable={true}
                  options={this.state.typeOptions} 
                  isMulti={true}
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