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

const getAthleteProfile = async function(){
    const response = await axios
    .get(url+'strava/athlete/', header);
    console.info(response.data);
    return response.data;

}

const deleteEmail = async function(rowtableid){
    await axios
    .delete(data.url+"strava/del-email/"+rowtableid+"/", header)
    .then(response => {
        if (response.status==200)
            return rowtableid;
        else
            return null;    
    })
    .catch((error) => {
        localStorage.stravaUuid ='';
        localStorage.athleteId ='';
        console.error(error);
        this.$router.push({name: 'Home'})
        return null;
    })
}


export const data ={
    getActivityTypes,
    getDestEmails,
    getAthleteProfile,
    deleteEmail,
    url,
};
