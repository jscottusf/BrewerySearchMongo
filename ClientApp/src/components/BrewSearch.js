import React, { Component } from 'react';
import API from '../utils/API';
import { InputBar, BarInput, InputBarBtn } from './InputBar';
import { CardDiv, CardBody, CardTitle, CardSubtitle, CardText } from './BootstrapCard';
import GridContainer from './GridContainer';
import { Link } from 'react-router-dom';

class BrewSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brewSearch: '',
            breweries: [],
            message: 'Results will render here'
        }
    }

    componentDidMount = () => {
        this.setState({ brewSearch: '', breweries: [] })
    }

    loadBreweries = () => {
        API.searchBreweryAPI(this.state.brewSearch)
            .then(res => {
                const breweries = res.data.response.brewery.items;
                if (breweries.length === 0) {
                    this.setState({ message: 'no breweries found' })
                }
                this.setState({ breweries: breweries })
            })
            .catch(err => console.log(err));
    }

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

    render() {
        return (
            <div className="container" id="main-container">
                <InputBar>
                    <BarInput onChange={this.handleInputChange} name="brewSearch" value={this.state.brewSearch} type="text" placeholder="Search any brewery by name..." />
                    <InputBarBtn onClick={this.handleSearchClick} label='Search' />
                </InputBar>
                {this.state.breweries.length ? (
                    <GridContainer style={{ gridTemplateColumns: '1fr 1fr' }}>
                        {this.state.breweries.map(brew => (
                            brew.brewery.location.brewery_city === "" ? null :
                                <CardDiv>
                                    <CardBody>
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
                ) : <h4>{this.state.message}</h4>}
            </div>
        )
    }
}

export default BrewSearch;