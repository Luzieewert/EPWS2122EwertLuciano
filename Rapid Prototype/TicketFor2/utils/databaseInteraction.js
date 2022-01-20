import axios from "axios";

export const genericFunction = () => null

export const handleGet = async (url,params = null, callback = genericFunction) => {
    await axios.get(url,{params: params})
        .then((res) => {
            callback(res.data.result)
        })
        .catch((err) => {
            console.log(err);
        });
}

export const handlePost = async (url, data, callback = genericFunction) => {
    await axios.post(url, data)
        .then((res) => {
            callback(res.data.result)
        })
        .catch((err) => {
            console.log(err);
        });
}

export const handlePut = async (url, data, callback = genericFunction) => {
    await axios.put(url, data)
        .then((res) => {
            callback(res.data.result)
        })
        .catch((err) => {
            console.log(err);
        });
}
