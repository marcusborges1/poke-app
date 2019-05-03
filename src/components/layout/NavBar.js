import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <Link 
            to="/pokemon"
            className="navbar-brand col-sm-3 col-md-2 mb-0 align-items-center"
          >
            Pokédex
          </Link>
          <div className="collape navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <ItemLink
                  to="/pokemon/new"
                  className="col-sm-3 col-md-2 mb-0 align-items-center"
                >
                  Create Pokémon
                </ItemLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

const ItemLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;