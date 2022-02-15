<template>
	<div class="strava">
    <div v-if="isSignIn">
        Hola {{athleteName}} - {{athleteUserName}}
    <button @click="cleanstravalogin"> Desconectar</button>
		</div>
    <div v-else>
      <h3>
        ¿Quieres compartir tus actividades de Strava con gente que no está en Strava? ¿O enviarte a ti mismo todas las actividades
        para tenerlas guardadas? 
        <br/>
      </h3>
      <p> Esta es tu aplicación, añade tu email: 
        <input type="text" id="athleteEmail" v-model="athleteEmail"/>
      <br/>
      <br/>
      Y aprueba en Strava el compartir tus actividades con esta aplicación. 
      <br/>
      <br/>
      
      <button @click="gostrava">Ir a strava</button>
      <br/>
      </p>
      
		</div>
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
    localStorage.athleteUserName = 'marcos';
  }
  return localStorage.stravaUuid
}

async function getAthleteName(){
  let myLocalAthleteprofile; 
  console.info("getAthName"+localStorage.athleteName)
  if (localStorage.athleteName ==undefined || localStorage.athleteName =='undefined' || localStorage.athleteName==''){
    console.info("go get athlete")
    myLocalAthleteprofile = await data.getAthleteProfile();
    localStorage.athleteName = myLocalAthleteprofile.name;
    localStorage.athleteEmail = myLocalAthleteprofile.email;
    if (myLocalAthleteprofile.username.substr(0,1)=='"')
      myLocalAthleteprofile.username = myLocalAthleteprofile.username.substring(1,myLocalAthleteprofile.username.length -1);
    localStorage.athleteUserName = myLocalAthleteprofile.username;
  
  } else{
    if (localStorage.athleteUserName.substr(0,1)=='"')
      localStorage.athleteUserName = localStorage.athleteUserName.substring(1,localStorage.athleteUserName.length -1);
    myLocalAthleteprofile ={
      name : localStorage.athleteName,
      email : localStorage.athleteEmail,
      username : localStorage.athleteUserName
    }
    
  }

    console.info("getAthNamedespues"+localStorage.athleteUserName)
    console.log(myLocalAthleteprofile);
    return myLocalAthleteprofile;
}
export default {
  name: "Home",
  components: {destEmails,addEmail},
  props: {
    msg: String
  },
  data() {
    return {
      athleteEmail: "",
      url_strava_auth: 'https://www.strava.com/api/v3/oauth/authorize?client_id='+ data.strava_id
  + '&scope=profile:read_all,activity:read_all&redirect_uri='
  + data.url+'strava/auth-mpg/&response_type=code&approval_prompt=auto&state='
  +getStravaUuid(),
      stravaUuid: getStravaUuid(),
      athleteId: localStorage.athleteId,
      athleteName: '',
      athleteUserName: 'marcos',
      isInit: false,
      isSignIn: false,
      loginresponse: "",
      contentQr: "",
    };
  },
  methods: {
  test(dataUrl,id){
            console.log(dataUrl, id)
            
        },
  cleanstravalogin(){
    localStorage.athleteId = ''
    localStorage.stravaUuid = ''
    localStorage.athleteName = ''
    localStorage.athleteUserName = 'marcos'
    localStorage.athleteEmail = ''
    localStorage.userName=''
    this.isSignIn = false
    this.athleteName =''
    this.athleteId = ''
    this.stravaUuid = getStravaUuid()

  },
  gostrava(){
    console.info(this.url_strava_auth+this.athleteEmail)
    if (this.athleteEmail=="" || this.athleteEmail == undefined){
      alert("Introduce your email")

    } else{
      window.location.href=this.url_strava_auth+this.athleteEmail

    }

  }
},
  async created() {
    if (this.$route.query.mpgstate != undefined &&
    this.$route.query.mpgstate.substring(0,36) == this.stravaUuid){
      console.info('checkurl:'+this.$route.query)
      localStorage.athleteId = this.$route.query.athlete;
      this.athleteId = localStorage.athleteId
      this.isSignIn =true
      let query = Object.assign({}, this.$route.query);
      delete query.mpgstate;
      delete query.athlete;
      this.$router.replace({ query });
    }
    if (localStorage.athleteId==undefined || localStorage.athleteId =='undefined' || localStorage.athleteId==''){
        this.isSignIn = false
    }
    else{
      this.isSignIn = true
      await getAthleteName().then(
        myLocalAthleteprofile => {
          this.athleteName = myLocalAthleteprofile.name
          this.athleteUserName = myLocalAthleteprofile.username;
        }
      )
    }
  },
};
</script>
