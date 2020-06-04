import axios from 'axios';
import app from './config';
const ID = app.ID;
const SECRET = app.SECRET;

export default {
    getBreweries: function () {
        return axios.get('/api/breweries');
    },
    getBrewery: function (id) {
        return axios.get('/api/breweries' + id);
    },
    deleteBrewery: function (id) {
        return axios.delete('/api/breweries' + id);
    },
    postBrewery: function (postData) {
        return axios.post('/api/breweries', postData);
    },
    editBrewery: function (id, postData) {
        return axios.put('/api/breweries' + id, postData);
    },
    patchBrewery: function (id, postData) {
        return axios.patch('/api/breweries' + id, postData);
    },
    searchBreweryAPI: function (query) {
        return axios.get(`https://api.untappd.com/v4/search/brewery?q=${query}&client_id=${ID}&client_secret=${SECRET}`);
    },
    getBreweryDetails: function (query) {
        return axios.get(`https://api.untappd.com/v4/brewery/info/${query}?client_id=${ID}&client_secret=${SECRET}`)
    }
}