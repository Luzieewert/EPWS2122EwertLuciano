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
                name: item.place.name,
                start_station_cords: {
                    latitude: item.place.location.lat,
                    longitude: item.place.location.lng,
                },
                departures: formatDepartures(item.departures)
            }
        })

        return res.status(200).json({result: result})

    } catch (err) {
        console.error(err)
    }
}

const getLinePath = async (req, res) => {
    //const {lineName} = req.params
    const {start_station_name, direction} = req.query
    const stations = [
        "Sparkasse Am Butzweilerhof",
        "IKEA Am Butzweilerhof" ,
    "Alter Flughafen Butzweilerhof" ,
    "Rektor-Klein-Str." ,
    "Margaretastr." ,
    "Iltisstr./Äußere Kanalstr." ,
    "Lenauplatz" ,
    "Nußbaumerstr." ,
    "Subbelrather Str./Gürtel" ,
    "Liebigstr." ,
    "Gutenbergstr.",
    "Hans-Böckler-Platz/Bf West" ,
    "Friesenplatz" ,
    "Appellhofplatz" ,
    "Dom/Hbf" ,
    "Köln Rathaus" ,
    "Heumarkt"]

    try {
        /*const url = `${urls.linePath}${lineName}`
        const response = await axios.get(url)*/
        //const startIndex = response.data.indexOf(start_station_name)
        //const endIndex = response.data.indexOf(direction)
        const startIndex = stations.indexOf(start_station_name)
        const endIndex = stations.indexOf(direction)

        const getProperOrder = (startIndex, endIndex) => {
            if(startIndex > endIndex) return [endIndex, startIndex]
            return [startIndex !== -1 ? startIndex + 1 : startIndex, endIndex !== -1 ? endIndex + 1 : endIndex]
        }
        const result = stations.slice(...getProperOrder(startIndex, endIndex))
        return res.status(200).json({result: result.length ? result : null})

    } catch (err) {
        console.error(err)
    }
}

module.exports = {getDeparturesInLocation, getLinePath}