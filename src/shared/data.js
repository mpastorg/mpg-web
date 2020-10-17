import * as axios from 'axios';
import * as lconfig from '../config';

const strava_id = lconfig.config.VUE_APP_STRAVA_ID || process.env.VUE_APP_STRAVA_ID;
const url = lconfig.config.VUE_APP_API_URL || process.env.VUE_APP_API_URL; 
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
    console.info('entering getAthleteProfile:' + url)
    const response = await axios
    .get(url+'strava/athlete/', header);
    console.info(response.data);
    return response.data;

}

const deleteEmail = async function(rowtableid){
    console.info('entering getDeleteEmail:' + url)
    await axios
    .delete(url+"strava/del-email/"+rowtableid+"/", header)
    .then(response => {
        if (response.status==200)
            return rowtableid;
        else
            return null;    
    })
    .catch((error) => {
        // localStorage.stravaUuid ='';
        // localStorage.athleteId ='';
        console.error(error);
        this.$router.push({name: 'Home'})
        return null;
    })
}
const addEmail = async function(destEmail){
    console.info('entering addEmail:' + url)
    await axios
    .post(url+"strava/activityemail",destEmail)
    .then(r => {
        if (r.status == 200){
            return destEmail.rowtableid;
        } else
            return null;
    })
    .catch((error) => {
        // localStorage.stravaUuid ='';
        // localStorage.athleteId ='';
        console.error(error);
        this.$router.push({name: 'Home'})
        return null;
    })

}
const addComments = async function(clientComments){
    console.info("addcomments: "+url+"strava/comments/")
    await axios
    .post(url+"strava/comments/",clientComments)
    .then(r => {
        if (r.status == 200){
            return r.status;
        } else
            return null;
    })
    .catch((error) => {
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
    addEmail,
    addComments,
    url,
    strava_id
};
