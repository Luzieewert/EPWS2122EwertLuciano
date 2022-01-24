import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStorageItem = async (key, value) => {
    try {
        const parseValue = typeof value === "string" ? value : JSON.stringify(value)
        return await AsyncStorage.setItem(key, parseValue);
    } catch (err) {
        console.error(err)
    }
}

export const getStorageItem = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (err) {
        console.error(err)
    }
}