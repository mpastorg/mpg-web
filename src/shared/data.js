import * as axios from 'axios';

export const url = process.env.VUE_APP_API_URL; 

const getActivityTypes = async function() {
    console.info('entering getactivitytypes:' + url)
    const response = await axios
        .get(url+'strava/act-types/');
    return response.data;
}

export const data ={
    getActivityTypes,
    url,
};
