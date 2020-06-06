import React, { Component } from 'react';
import API from '../utils/API';
import { InputBar, BarInput, InputBarBtn } from './InputBar';
import { CardDiv, CardBody, CardTitle, CardSubtitle, CardText } from './BootstrapCard';
import GridContainer from './GridContainer';
import { Link } from 'react-router-dom';
import AlertMessage from './Alert';

class BrewSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brewSearch: 'Bud',
            breweries: [],
            queryMessage: '...loading',
            savedList: [],
            mongoIds: [],
            show: false,
            variant: undefined,
            message: '',
        }
    }

    componentDidMount = () => {
        this.loadFavorites();
        this.loadBreweries();
    }

    loadBreweries = () => {
        API.searchBreweryAPI(this.state.brewSearch)
            .then(res => {
                const breweries = res.data.response.brewery.items;
                if (breweries.length === 0) {
                    this.setState({ message: 'no breweries found' })
                }
                this.setState({ breweries: breweries, brewSearch: '' })
            })
            .catch(err => console.log(err));
    }

    loadFavorites = () => {
        API.getBreweries().then(res => {
            const favorites = res.data;
            const savedList = favorites.map(fave => {
                const splitUrl = fave.Url.split('/');
                return parseInt(splitUrl[2]);
            });
            const mongoIds = favorites.map(fave => {
                const splitUrl = fave.Url.split('/');
                let brewId = splitUrl[2]
                return { mongoId: fave.Id }
            });

            this.setState({ savedList: savedList, mongoIds: mongoIds });
        }).catch(err => console.log(err));
    };

    handleSearchClick = event => {
        event.preventDefault();
        this.loadBreweries();
        
    }

    handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
        });
    };

    handleSaveBreweryClick = (event, name, logo, address, city, state, Url) => {
        event.preventDefault();
        API.postBrewery({
            Name: name,
            Logo: logo,
            Address: address,
            City: city,
            State: state,
            Url: '/breweries/' + Url,
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

    handleDeleteBreweryClick = (event, id) => {
        event.preventDefault();
        API.deleteBrewery(id).then(res => {
            const show = true;
            const message = 'Brewery removed from saved list';
            const variant = 'danger';
            this.setState({
                show: show,
                message: message,
                variant: variant,
                savedList: [],
                mongoIds: []
            });
            this.componentDidMount();
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container" id="main-container">
                <InputBar>
                    <BarInput onChange={this.handleInputChange} name="brewSearch" value={this.state.brewSearch} type="text" placeholder="Search any brewery by name..." />
                    <InputBarBtn onClick={this.handleSearchClick} label='Search' />
                </InputBar>
                <AlertMessage show={this.state.show} variant={this.state.variant} message={this.state.message} />
                {this.state.breweries.length ? (
                    <GridContainer style={{ gridTemplateColumns: '1fr 1fr' }}>
                        {this.state.breweries.map(brew => (
                            brew.brewery.location.brewery_city === "" ? null :
                                <CardDiv>
                                    <CardBody>
                                        <div id="save">
                                            {this.state.savedList.indexOf(brew.brewery.brewery_id) === -1
                                                ? <i class="far fa-heart"
                                                    id="notSavedSearch"
                                                    onClick={(event, name, logo, address, city, state, Url) =>
                                                        this.handleSaveBreweryClick(event, brew.brewery.brewery_name, brew.brewery.brewery_label, brew.brewery.location.brewery_address, brew.brewery.location.brewery_city, brew.brewery.location.brewery_state, brew.brewery.brewery_id)}></i>
                                                : <i className="fas fa-heart" id="redSearch" onClick={(event, id) => this.handleDeleteBreweryClick(event, this.state.mongoIds[this.state.savedList.indexOf(brew.brewery.brewery_id)].mongoId)}></i>}
                                        </div>
                                        <GridContainer style={{ gridTemplateColumns: '20% 1fr' }}>
                                            <div id="breweryImgDiv">
                                                <img id="breweryImg" alt={brew.brewery.brewery_name} src={brew.brewery.brewery_label} />
                                            </div>
                                            <div>
                                                <CardTitle>{brew.brewery.brewery_name}</CardTitle>
                                                <CardSubtitle>{brew.brewery.location.brewery_city}, {brew.brewery.location.brewery_state}</CardSubtitle>
                                                <Link to={'/breweries/' + brew.brewery.brewery_id}> Learn More </Link>
                                            </div>
                                        </GridContainer>
                                    </CardBody>
                                </CardDiv>
                                ))}
                    </GridContainer>
                ) : <h4>{this.state.queryMessage}</h4>}
            </div>
        )
    }
}

export default BrewSearch;