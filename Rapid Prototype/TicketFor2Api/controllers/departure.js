const {urls} = require("../utils/urls")
const axios = require('axios')
const moment = require("moment");


const getDeparturesInLocation = async (req, res) => {
    const {location, radius} = req.query
    const url = `${urls.hereDepartures}&in=${location};r=${radius}`

    const formatDepartures = (departures) => departures.map(departure => {
        return {
            name: departure.transport.name,
            direction: departure.transport.headsign,
            time: moment(departure.time).format("HH:mm"),
            delay: departure.delay
        }
    })

    try {
        const response = await axios.get(url)
        const result = response.data.boards.map(item => {
            return {
                start_station_name: item.place.name,
                start_station_cords: {
                    latitude: item.place.location.lat,
                    longitude: item.place.location.lng,
                },
                departures: formatDepartures(item.departures)
            }
        })

        return res.status(200).json({data: result})

    } catch (err) {
        console.error(err)
    }
}

module.exports = {getDeparturesInLocation}