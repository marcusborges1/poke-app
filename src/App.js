import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import NavBar from './components/layout/NavBar';
import Dashboard from './components/layout/Dashboard';

import Pokemon from './components/pokemon/Pokemon';
import PokemonForm from './components/pokemon/PokemonForm';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className="container">
          <Switch>
            <Route exact path="/"><Redirect to="/pokemon"/></Route>
            <Route exact path="/pokemon" component={Dashboard}></Route>
            <Route exact path="/pokemon/new" component={PokemonForm}></Route>
            <Route exact path="/pokemon/:id" component={Pokemon}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
