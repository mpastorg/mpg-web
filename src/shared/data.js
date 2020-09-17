import * as axios from 'axios';

const url = process.env.VUE_APP_API_URL; 
var header= {headers: {'vueid' : localStorage.stravaUuid}}
				


const getActivityTypes = async function() {
    console.info('entering getactivitytypes:' + url)
    const response = await axios
        .get(url+'strava/act-types/');
    return response.data;
}

const getDestEmails = async function() {
    console.info('entering getDestEmails:' + url)
    const response = await axios
    .get(url+'strava/dest-email/'+localStorage.athleteId, header);
    
    return response.data;
}


export const data ={
    getActivityTypes,
    getDestEmails,
    url,
};
