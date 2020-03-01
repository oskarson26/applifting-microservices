const fetch = require('node-fetch')
const handlers = require('../handlers/handlers')

const dogs = (req, res) => {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(handlers.dogs)
        .then(response => res.send(response))
        .catch(e => new Error(e))
}

const cats = (req, res) => {
    fetch("https://api.thecatapi.com/v1/images/search")
        .then(handlers.cats)
        .then(response => res.send(response))
        .catch(e => new Error(e));
}

const meowfacts = (req, res) => {
    fetch("https://meowfacts.herokuapp.com/")
        .then(handlers.meowfacts)
        .then(response => res.send(response))
        .catch(e => new Error(e));
}
module.exports = {dogs,cats,meowfacts}