import React, { Component } from 'react';
import API from '../utils/API';
import { InputBar, BarInput, InputBarBtn } from './InputBar';
import { CardDiv, CardBody, CardTitle, CardSubtitle, CardText } from './BootstrapCard';
import GridContainer from './GridContainer';
import { Link } from 'react-router-dom';

class Brewery extends Component {
    constructor(props) {
        super(props);
        this.route = window.location.pathname.split('/');
        this.breweryId = this.route[2];
        this.state = {
            breweryId: '',
            breweryData: '',
            message: 'Error 404 Brewery Not Found',
            beerList: []
        }
    }

    componentDidMount = () => {
        this.setState({ breweryId: this.breweryId })
        this.loadBreweryData(this.breweryId);
        
    }

    loadBreweryData = id => {
        API.getBreweryDetails(id).then(res => {
                this.setState({
                    breweryData: res.data.response.brewery,
                    beerList: res.data.response.brewery.beer_list.items
                })
            
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container mt-3" id="main-container">
                {this.state.breweryData !== '' ? (
                    <CardDiv>
                        <CardBody>
                            <GridContainer style={{ gridTemplateColumns: '20% 1fr' }}>
                                <div id="breweryImgDiv">
                                    <img id="breweryPageImg" alt={this.state.breweryData.brewery_name} src={this.state.breweryData.brewery_label} />
                                </div>
                                <div>
                                    <CardTitle>{this.state.breweryData.brewery_name}</CardTitle>
                                    <CardSubtitle>{this.state.breweryData.location.brewery_address}</CardSubtitle>
                                    <CardSubtitle>{this.state.breweryData.location.brewery_city}, {this.state.breweryData.location.brewery_state}</CardSubtitle>
                                    <CardText>{this.state.breweryData.brewery_description}</CardText>
                                </div>
                            </GridContainer>
                            <br></br>
                            <h4>{this.state.beerList.length} popular beers from {this.state.breweryData.brewery_name}</h4><hr></hr>
                            {this.state.beerList.map(beer => (
                                <CardDiv>
                                    <CardBody>
                                        <GridContainer style={{ gridTemplateColumns: '15% 1fr' }}>
                                            <div id="breweryImgDiv">
                                                <img id="breweryImg" alt={beer.beer.beer_name} src={beer.beer.beer_label} />
                                            </div>
                                            <div>
                                                <CardTitle>
                                                    {beer.beer.beer_name}
                                                </CardTitle>
                                                <CardSubtitle>{beer.beer.beer_style}</CardSubtitle>
                                                <CardText>{beer.beer.beer_description}</CardText>
                                                <CardText>ABV: {beer.beer.beer_abv} | IBU: {beer.beer.beer_ibu} </CardText>
                                            </div>
                                        </GridContainer>
                                    </CardBody>
                                </CardDiv>
                            ))}
                        </CardBody>
                    </CardDiv>
                ) : <h4>{this.state.message}</h4>}
            </div>
        )
    }
}

export default Brewery;