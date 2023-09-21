const citiesService = require('./cities.service')

async function getCities(req, res, next) {
    try {
        res.json(await citiesService.getCities());
    } catch (err) {
        console.error(`Error while getting cities`, err.message);
        next(err);
    }
}

module.exports = {
    getCities,
};
