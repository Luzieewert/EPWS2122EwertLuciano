import RNLocation from "react-native-location";

export const locationPermissionHandle = async () => {
    let permission = await RNLocation.checkPermission({
        ios: 'whenInUse', // or 'always'
        android: {
            detail: 'coarse' // or 'fine'
        }
    })
    if(!permission) {
      permission = await RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "coarse",
                rationale: {
                    title: "Wir brauchen zugriff auf ihr Standort",
                    message: "Wir nutzen ihre Standort um viele unsere Funktionalitäten bieten zu können",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
            }
        })
    }
    return permission
}

export const getLocation = async () => {
    const location = await RNLocation.getLatestLocation({timeout: 100})
    return {
        latitudeDelta: 0.00375,
        longitudeDelta: 0.00521,
        latitude: location.latitude,
        longitude: location.longitude
    }
};