<template>
	<div class="home">
		<img src="../assets/logo.jpg">
		<h1>
			<a href="https://www.strava.com/api/v3/oauth/authorize?client_id=48995&scope=profile:read_all,activity:read_all&redirect_uri=https://api.madastur.com/strava/auth-mpg/&response_type=code&approval_prompt=auto">Go to Strava.com to authorize madastur.com</a>
		</h1>
		<br/>
		<br/>
		<button
        type="primary"
        icon="fas fa-edit"
        @click="handleClickLogin"
      >get authCode</button>
      <button
        type="primary"
        icon="fas fa-edit"
        @click="handleClickSignIn"
        v-if="!isSignIn"
      >sign in</button>
		<h1>
			<a href="https://www.strava.com/api/v3/oauth/authorize?client_id=48995&scope=profile:read_all,activity:read_all&redirect_uri=http://localhost:8082/strava/auth-mpg/&response_type=code&approval_prompt=auto">Go to Strava.com to authorize localhost</a>
		</h1>
      <br/>
		<h1>
			<a href="http://localhost:8082/oauth2/authorization/strava">http://localhost:8082/oauth2/authorization/strava</a>
		</h1>
      <br/>
      <button @click="stravalogin"> Strava login</button>
      <br/>
      <input type="text" id="loginresponse" v-model="loginresponse">
	</div>
</template>
<script>
const axios = require('axios').default;
export default {
  name: "Home",
  props: {
    msg: String
  },
  data() {
    return {
      isInit: false,
      isSignIn: false,
      loginresponse: "",
    };
  },
  methods: {
	stravalogin(){
		axios
			.get('http://localhost:8082/strava/user/')
			.then(response => (this.loginresponse = response));
	},
    handleClickLogin() {
      this.$gAuth
        .getAuthCode()
        .then(authCode => {
          //on success
          console.log("authCode", authCode);
        })
        .catch(error => {
          //on fail do something
          console.error(error);
        });
    },
    handleClickSignIn() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          //on success do something
          console.log("GoogleUser", GoogleUser);
          console.log("getId", GoogleUser.getId());
          console.log("getBasicProfile", GoogleUser.getBasicProfile());
          console.log("getAuthResponse", GoogleUser.getAuthResponse());
          console.log(
            "getAuthResponse",
            this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
          );
          this.isSignIn = this.$gAuth.isAuthorized;
        })
        .catch(error => {
          //on fail do something
          console.error(error);
        });
    },
    created() {
    let that = this;
    let checkGauthLoad = setInterval(function() {
      that.isInit = that.$gAuth.isInit;
      that.isSignIn = that.$gAuth.isAuthorized;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  }
}
};
</script>
