import React, { Component } from 'react';
import API from '../utils/API';
import { CardDiv, CardBody, CardTitle, CardSubtitle, CardText } from './BootstrapCard';
import GridContainer from './GridContainer';
import { Link } from 'react-router-dom';
import AlertMessage from './Alert';

class Brewery extends Component {
    constructor(props) {
        super(props);
        this.route = window.location.pathname.split('/');
        this.breweryId = this.route[2];
        this.state = {
            breweryData: '',
            queryMessage: '...loading',
            beerList: [],
            savedList: [],
            show: false,
            variant: undefined,
            message: '',
        }
    };

    componentDidMount = () => {
        this.loadBreweryData(this.breweryId);
        this.loadFavorites();
    };

    loadBreweryData = id => {
        API.getBreweryDetails(id).then(res => {
            this.setState({
                breweryData: res.data.response.brewery,
                beerList: res.data.response.brewery.beer_list.items
            })

        }).catch(err => console.log(err));
    };

    loadFavorites = () => {
        API.getBreweries().then(res => {
            const favorites = res.data;
            const savedList = favorites.map(fave => {return fave.Url });
            const saved = favorites.filter(fave => (fave.Url === window.location.pathname));
            let savedId;
            saved ? savedId = saved[0].Id : savedId = null;
            this.setState({ savedList: savedList, savedId: savedId });
        }).catch(err => console.log(err));
    };

    handleSaveBreweryClick = (event) => {
        event.preventDefault();
        API.postBrewery({
            Name: this.state.breweryData.brewery_name,
            Logo: this.state.breweryData.brewery_label,
            Address: this.state.breweryData.location.brewery_address,
            City: this.state.breweryData.location.brewery_city,
            State: this.state.breweryData.location.brewery_state,
            Url: '/breweries/' + this.state.breweryData.brewery_id,
            Rating: 0
        }).then(res => {
            const show = true;
            const message = 'Brewery added to saved list';
            const variant = 'success';
            this.setState({
                show: show,
                message: message,
                variant: variant
            });
            this.componentDidMount();
        }).catch(err => console.log(err));
    };

    handleDeleteBreweryClick = (event) => {
        event.preventDefault();
        API.deleteBrewery(this.state.savedId).then(res => {
            const show = true;
            const message = 'Brewery removed from saved list';
            const variant = 'danger';
            this.setState({
                show: show,
                message: message,
                variant: variant,
                savedList: []
            });
            this.componentDidMount();
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container mt-3" id="main-container">
                <AlertMessage show={this.state.show} variant={this.state.variant} message={this.state.message} />
                {this.state.breweryData !== '' ? (
                    <CardDiv>
                        
                        <CardBody>
                            <div id="save">
                                {this.state.savedList.indexOf(`/breweries/${this.state.breweryData.brewery_id}`) === -1 ? <i class="far fa-heart" id="notSaved" onClick={this.handleSaveBreweryClick}></i> : <i className="fas fa-heart" id="red" onClick={this.handleDeleteBreweryClick}></i>}
                            </div>
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
                ) : <h4>{this.state.queryMessage}</h4>}
            </div>
        )
    }
}

export default Brewery;