import axios from 'axios';

const baseURL = process.env.REACT_APP_URL ? process.env.REACT_APP_URL : 'http://localhost:3000/';

axios.defaults.baseURL = baseURL;
axios.defaults.method = 'post';
axios.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

export const api = async props => {
    try {
        const { data } = await axios(props);
        return data;
    } catch (error) {
        throw error;
    }
};