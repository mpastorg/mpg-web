<template>
	<div class="about">
	<button @click="showActivityTypes()">Show Activity types</button>
	<ActivityTypes v-if="mybool" :listActivityTypes= "activityTypes" />
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
				<td>Athlete: </td><td><input type="input" id="athleteid" v-model="myjobject.athleteid"/></td>		
			</tr>
			<tr>
				<td>Dest email: </td><td><input type="text" id="destemail" v-model="myjobject.destemail"/></td>		
			</tr>
			<tr>
				<td>Dest name: </td><td><input type="text" id="destname" v-model="myjobject.destname"/></td>		
			</tr>
			<tr>
				<td>Activity:</td>
				<td>
					<select v-model="myjobject.activitytype">
						<option v-for="item in activityTypes" :key="item.rowtableid">
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
	import { mapState, mapActions } from 'vuex';
	import { data} from '../shared';

	const axios = require('axios').default;
	export default {
		name: "About",
		components: {ActivityTypes},
		data() {
			return {
				message: localStorage.athleteId,
				myjobject: {
					athleteid: this.message,
					destemail: "",
					destname:"",
					activitytype:"",
					approved:false

				},
				header: {headers: {'vueid' : localStorage.stravaUuid}},
				mybool:true,
				mybool2:false,
				emails: []
			};
			
		},
		methods: {
			...mapActions(['getActivityTypesAction']),
			showActivityTypes(){
				this.mybool = !this.mybool;
			},
			async getAthleteEmails(){
				await axios
				.get(data.url+'strava/dest-email/'+this.message, this.header)
				.then(response => (this.emails = response));
				this.mybool2 = true;
			},
			async submitEmail(){
				await axios
				.post(data.url+"strava/activityemail",this.myjobject), this.header;
				this.getAthleteEmails();
			},
			async deleteEmail(rowtableid){
				//TODO it's not refreshing correctly after delete the email
				await axios
				.delete(data.url+"strava/del-email/"+rowtableid+"/", this.header)
				.then(await this.getAthleteEmails())
				.catch((error) => {
					localStorage.stravaUuid ='';
					localStorage.athleteId ='';
					this.$router.push({name: 'Home'})					
					throw error.response.data;
				})

			}

		},
		async created () {
			console.info('Entering created')
			await this.getActivityTypesAction();

			if (localStorage.athleteId=='' || localStorage.athleteId==undefined){
				this.$router.push({name: 'Home'})
			}
		},
		computed: {
			...mapState(['activityTypes'] )
		}
	}
</script>
