import axios from "axios";

export const handlePost = async (url, data, callback = () => null) => {
    await axios.post(url,data)
        .then( (res) => {
            callback(res)
        })
        .catch((err) => {
            console.log(err);
        });
}