<template>
	<div class="home">
		<img src="../assets/logo.jpg">
    <div>
      Hello {{athleteName}}
    </div>
    <button v-if="isSignIn" @click="cleanstravalogin"> Log out</button>
		<div v-else>
		<h1>
			<a v-bind:href="url_strava_auth">Go to Strava.com to authorize this app</a>
		</h1>

		</div>
      <br/>
      <br/>
      <br/>
      
      <div v-if="isSignIn">
        <destEmails/>
        <br/>
        <addEmail/>
      </div>
	</div>
</template>
<script>
import { uuid} from 'vue-uuid';
import { data } from '../shared';
//import ActivityTypes from "@/components/activity-types"
import addEmail from "@/components/add-email"
import destEmails from "@/components/dest-emails"

function getStravaUuid(){
  if (!localStorage.stravaUuid){
    localStorage.stravaUuid = uuid.v4() 
  }
  return localStorage.stravaUuid
}
function getUrlStrava(){
  const url1='https://www.strava.com/api/v3/oauth/authorize?client_id='+ data.strava_id
  + '&scope=profile:read_all,activity:read_all&redirect_uri='
  + data.url+'strava/auth-mpg/&response_type=code&approval_prompt=auto&state='+getStravaUuid()
  return url1
}
//TODO Refactor to centralize localStorage and control athleteID
async function getAthleteName(){
    console.info("getAthName"+localStorage.athleteName)
  if (localStorage.athleteName ==undefined || localStorage.athleteName =='undefined' || localStorage.athleteName==''){
    console.info("go get athlete")
    const myLocalAthleteprofile = await data.getAthleteProfile();
    localStorage.athleteName = myLocalAthleteprofile.name;
    localStorage.athleteEmail = myLocalAthleteprofile.email;
  }
    console.info("getAthNamedespues"+localStorage.athleteName)
    return localStorage.athleteName
}
export default {
  name: "Home",
  components: {destEmails,addEmail},
  props: {
    msg: String
  },
  data() {
    return {
      url_strava_auth: getUrlStrava(),
      stravaUuid: getStravaUuid(),
      athleteId: localStorage.athleteId,
      athleteName: '',
      isInit: false,
      isSignIn: false,
      loginresponse: "",
    };
  },
  methods: {
  cleanstravalogin(){
    localStorage.athleteId = ''
    localStorage.stravaUuid = ''
    localStorage.athleteName = ''
    localStorage.athleteEmail = ''
    this.isSignIn = false
    this.athleteName =''
    this.athleteId = ''
    this.stravaUuid = getStravaUuid()

	}
},
  async created() {
    if (this.$route.query.mpgstate == this.stravaUuid){
      console.info('checkurl:'+this.$route.query)
      localStorage.athleteId = this.$route.query.athlete;
      this.athleteId = localStorage.athleteId
      this.isSignIn =true
      let query = Object.assign({}, this.$route.query);
      delete query.mpgstate;
      delete query.athlete;
      this.$router.replace({ query });
    }
    if (localStorage.athleteId==undefined || localStorage.athleteId =='undefined' || localStorage.athleteId=='')
      this.isSignIn = false
    else{
      this.isSignIn = true
      this.athleteName = await getAthleteName()
    }
  },
};
</script>
