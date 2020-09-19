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
				<tr v-for="email in destEmails" :key="email.rowtableid">
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
				<td>Athlete ID: </td><td><span id="athleteid">{{message}}</span></td>		
			</tr>
			<tr>
				<td>Athlete Name: </td><td><span id="athleteName">TODO</span></td>		
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
			...mapActions(['getActivityTypesAction','getDestEmailsAction']),
			showActivityTypes(){
				this.mybool = !this.mybool;
			},
			async getAthleteEmails(){
				await this.$store.dispatch('getDestEmailsAction')
				this.mybool2 = true;
			},
			async submitEmail(){
				await axios
				.post(data.url+"strava/activityemail",this.myjobject);
				this.getAthleteEmails();
			},
			async deleteEmail(rowtableid){
				await this.$store.dispatch('deleteDestEmailAction',rowtableid);
				this.getAthleteEmails();
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
			...mapState(['activityTypes','destEmails'] )
		}
	}
</script>
