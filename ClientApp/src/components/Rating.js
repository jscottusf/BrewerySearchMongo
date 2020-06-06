import React, { Component } from 'react';
import API from '../utils/API';

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        }
    }

    componentWillMount() {
        this.setState({ rating: this.props.rating });
    }

    handleRatingClick = (id, rating) => {
        API.editBrewery(id, {
            Name: this.props.Name,
            Logo: this.props.Logo,
            Address: this.props.Address,
            City: this.props.City,
            State: this.props.State,
            Url: this.props.Url,
            Rating: rating
        }).then(res => {
            this.setState(this.setState({ rating: rating }))
            this.props.loadSavedBreweries();
        }).catch(err => console.log(err));
    }

    ratingDisplay = (rating) => {
        switch (rating) {
            case 0:
                return (<div><i onClick={(id, rating) => this.handleRatingClick(this.props.id, 1)} className="far fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 2)} className="far fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 3)} className="far fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 4)} className="far fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 5)} className="far fa-star"></i></div>);
            case 1:
                return (<div><i onClick={(id, rating) => this.handleRatingClick(this.props.id, 1)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 2)} className="far fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 3)} className="far fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 4)} className="far fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 5)} className="far fa-star"></i></div >);
            case 2:
                return (<div><i onClick={(id, rating) => this.handleRatingClick(this.props.id, 1)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 2)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 3)} className="far fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 4)} className="far fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 5)} className="far fa-star"></i></div >);
            case 3:
                return (<div><i onClick={(id, rating) => this.handleRatingClick(this.props.id, 1)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 2)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 3)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 4)} className="far fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 5)} className="far fa-star"></i></div >);
            case 4:
                return (<div><i onClick={(id, rating) => this.handleRatingClick(this.props.id, 1)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 2)} className="fas fa-star"></i> <i vonClick={(id, rating) => this.handleRatingClick(this.props.id, 3)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 4)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 5)} className="far fa-star"></i></div >);
            case 5:
                return (<div><i onClick={(id, rating) => this.handleRatingClick(this.props.id, 1)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 2)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 3)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 4)} className="fas fa-star"></i> <i onClick={(id, rating) => this.handleRatingClick(this.props.id, 5)} className="fas fa-star"></i></div >);
        }
    }

    render() {
        return (
            <div>
                {this.ratingDisplay(this.state.rating)}
            </div>
        );
    }
}

export default Rating;
