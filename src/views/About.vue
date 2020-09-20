<template>
	<div class="about">
	<button @click="showActivityTypes()">Show Activity types</button>
	<ActivityTypes v-if="myShowActivities" :listActivityTypes= "activityTypes" />
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
				<td>Dest email: </td><td><input type="text" id="destemail" v-model="myDestEmail.destemail"/></td>		
			</tr>
			<tr>
				<td>Dest name: </td><td><input type="text" id="destname" v-model="myDestEmail.destname"/></td>		
			</tr>
			<tr>
				<td>Activity:</td>
				<td>
					<select v-model="myDestEmail.activitytype">
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
	export default {
		name: "About",
		components: {ActivityTypes},
		data() {
			return {
				message: localStorage.athleteId,
				myDestEmail: {
					athleteid: localStorage.athleteId,
					destemail: "",
					destname:"",
					activitytype:"",
					approved:false

				},
				header: {headers: {'vueid' : localStorage.stravaUuid}},
				myShowActivities:true,
			};
			
		},
		methods: {
			...mapActions(['getActivityTypesAction']),
			showActivityTypes(){
				this.myShowActivities = !this.myShowActivities;
			},
			async submitEmail(){
				await this.$store.dispatch('addDestEmailAction', this.myDestEmail)
				this.myDestEmail.destemail="";
				this.myDestEmail.destname="";
				this.myDestEmail.activitytype="";
				this.getAthleteEmails();
			},

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
