const getCities = async () => {
    const { cities } = require('../utils/cities');
    return { cities };
}

module.exports = {
    getCities
}