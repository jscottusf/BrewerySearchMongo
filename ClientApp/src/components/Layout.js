import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import Hero from './Hero'

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
            <Hero>
                <h1>Brewery Search</h1>
                <h2>Find and Save Local Breweries. Powered by C#, ReactJS, and the untappd api.</h2>
            </Hero>
          {this.props.children}
      </div>
    );
  }
}
