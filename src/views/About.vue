<template>
	<div class="about">
	<button @click="showActivityTypes()">Show Activity types</button>
	<ActivityTypes v-if="mybool" :listActivityTypes= "activityTypes.data" />
	<span>
		<h1>List emails per athlete</h1>
		<input type="input" id="idinput" v-model="message"/>
		<!--<pre>### {{ info }} ###</pre>-->
		<button @click="getAthleteEmails()">Get Athlete emails</button>
		<div v-if="mybool2">
			<br/>
			<table align="center">
				<tr v-for="email in emails.data" :key="email.rowtableid">
					<td>{{email.activitytype}}</td>
					<td>{{ email.destemail}}</td>
					<td>{{email.destname}}</td>
					<td>{{email.approved}}</td>
					<td><button @click="deleteEmail(email.rowtableid)">Delete email</button></td>
				</tr>	
			</table>
		</div>
	</span>
	<div align="center">
		<h2>Add email to athlete</h2>
		<table align="center">
			<tr>
				<td>Dest email: </td><td><input type="text" id="destemail" v-model="myjobject.destemail"></td>		
			</tr>
			<tr>
				<td>Dest name: </td><td><input type="text" id="destname" v-model="myjobject.destname"></td>		
			</tr>
			<tr>
				<td>Activity:</td>
				<td>
					<select v-model="myjobject.activitytype">
						<option v-for="item in activityTypes.data" :key="item.rowtableid">
						{{ item.activitytype}}
						</option>
					</select>
				</td>
			</tr>
		</table>
		<center><button @click="submitEmail()">Submit new email</button></center>
	</div>

  </div>
</template>

<script>
    import ActivityTypes from "@/components/activity-types"
	const axios = require('axios').default;
	export default {
		name: "About",
		components: {ActivityTypes},
		data() {
			return {
				myjobject: {
					athleteid: this.message,
					destemail: "",
					destname:"",
					activitytype:"",
					approved:false

				},
				//url: "http://localhost:8082/",
				url: "https://api.madastur.com/",
				message: localStorage.athleteId,
				header: {headers: {'vueid' : localStorage.stravaUuid}},
				mybool:true,
				mybool2:false,
				activityTypes: [],
				emails: []
			};
			
		},
		methods: {
			showActivityTypes(){
				this.mybool = !this.mybool;
			},
			async getAthleteEmails(){
				await axios
				.get(this.url+'strava/dest-email/'+this.message, this.header)
				.then(response => (this.emails = response));
				this.mybool2 = true;
			},
			async submitEmail(){
				//this.mybool2 = false;
				this.myjobject.athleteid = this.message;
				await axios
				.post(this.url+"strava/activityemail",this.myjobject), this.header;
				this.getAthleteEmails();
			},
			async deleteEmail(rowtableid){
				//this.mybool2 = false;
				await axios
				.delete(this.url+"strava/del-email/"+rowtableid+"/", this.header)
				this.getAthleteEmails();

			}

		},
		created () {
			console.info('Entering created')

			if (localStorage.athleteId==''){
				this.$router.push({name: 'Home'})
			}
			axios
			.get(this.url+'strava/act-types/')
			.then(response => (this.activityTypes = response))
		}
	}
</script>
