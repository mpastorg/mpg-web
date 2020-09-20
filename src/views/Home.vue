<template>
	<div class="home">
		<img src="../assets/logo.jpg">
    <div>
      Hello, {{athleteName}}
    </div>
		<h1>
			<a v-bind:href="'https://www.strava.com/api/v3/oauth/authorize?client_id=48995&scope=profile:read_all,activity:read_all&redirect_uri=https://api.madastur.com/strava/auth-mpg/&response_type=code&approval_prompt=auto&state='+stravaUuid">Go to Strava.com to authorize madastur.com</a>
		</h1>
		<h1>
			<a v-bind:href="'https://www.strava.com/api/v3/oauth/authorize?client_id=48995&scope=profile:read_all,activity:read_all&redirect_uri=http://localhost:8082/strava/auth-mpg/&response_type=code&approval_prompt=auto&state='+stravaUuid">Go to Strava.com to authorize localhost</a>
		</h1>
      <br/>
		<button
        type="primary"
        icon="fas fa-edit"
        @click="handleClickLogin"
      >get authCode</button>
      <br/>
      <br/>
      <button @click="cleanstravalogin"> Clean Strava login</button>
      <br/>
      <span id="mystorage">
        uuid: {{stravaUuid}} <br/>
        athleteId: {{athleteId}}
      </span> <br/>
      
      <div v-if="isSignIn">
        <destEmails/>
      </div>
	</div>
</template>
<script>
import { uuid} from 'vue-uuid';
import { data } from '../shared';
//import ActivityTypes from "@/components/activity-types"
import destEmails from "@/components/dest-emails"

function getStravaUuid(){
  if (!localStorage.stravaUuid){
    localStorage.stravaUuid = uuid.v4() 
  }
  return localStorage.stravaUuid
}

function getAthleteId(){
  return localStorage.athleteId
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
  components: {destEmails},
  props: {
    msg: String
  },
  data() {
    return {
      stravaUuid: getStravaUuid(),
      athleteId: getAthleteId(),
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
    this.athleteId = getAthleteId()
    this.stravaUuid = getStravaUuid()

	},
    handleClickLogin() {
      console.info(data.getAthleteProfile());

  },
  checkUrl(){
    if (this.$route.query.mpgstate == this.stravaUuid){
      console.info('checkurl:'+this.$route.query)
      localStorage.athleteId = this.$route.query.athlete;
      this.athleteId = localStorage.athleteId
      this.isSignIn =true
      this.$router.query=''

    }
    //return this.$route.query
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
