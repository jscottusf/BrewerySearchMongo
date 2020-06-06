import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import BrewSearch from './components/BrewSearch';
import Brewery from './components/Brewery';
import Saved from './components/Saved';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        <Layout>
              <Route exact path='/' component={BrewSearch} />
              <Route exact path='/breweries/:id' component={Brewery} />
              <Route exact path='/saved' component={Saved} />
        </Layout>
    );
  }
}
