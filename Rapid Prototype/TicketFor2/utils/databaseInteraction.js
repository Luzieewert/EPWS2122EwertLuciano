import axios from "axios";

const genericFunction = () => null

export const handleGet = async (url, callback = genericFunction) => {
    await axios.get(url)
        .then((res) => {
            callback(res)
        })
        .catch((err) => {
            console.log(err);
        });
}

export const handlePost = async (url, data, callback = genericFunction) => {
    await axios.post(url, data)
        .then((res) => {
            callback(res)
        })
        .catch((err) => {
            console.log(err);
        });
}

export const handlePut = async (url, data, callback = genericFunction) => {
    await axios.put(url, data)
        .then((res) => {
            callback(res)
        })
        .catch((err) => {
            console.log(err);
        });
}