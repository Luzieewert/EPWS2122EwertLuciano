const getHaversineDistanceM = (loc1, loc2) => {
    const RADIUS_OF_EARTH_IN_KM = 6371;
    const toRadian = angle => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);

    let [lat1, lon1] = [loc1.latitude, loc1.longitude]
    let [lat2, lon2] = [loc2.latitude, loc2.longitude]

    const disLat = distance(lat2, lat1);
    const disLon = distance(lon2, lon1);


    const a = Math.pow(Math.sin(disLat / 2), 2) + Math.pow(Math.sin(disLon / 2), 2)
        * Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2));
    const c = 2 * Math.asin(Math.sqrt(a));


    return (RADIUS_OF_EARTH_IN_KM * c) * 1000;
};

module.exports = {getHaversineDistanceM}