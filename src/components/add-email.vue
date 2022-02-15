<template>
    <div align="center">
		<h3>Añadir email que recibe actividades </h3>
		<table align="center">
			<tr hidden='true'>
				<td>Athlete ID: </td><td><span id="athleteid">{{myDestEmail.athleteid}}</span></td>		
			</tr>
			<tr>
				<td>Athlete Name: </td><td><span id="athleteName">{{localAthleteName}}</span></td>		
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
</template>
<script>
	import { mapState, mapActions } from 'vuex';
	export default {
		name: "AddEmail",
		data() {
			return {
                localAthleteName: localStorage.athleteName,
				myDestEmail: {
					athleteid: localStorage.athleteId,
					destemail: "",
					destname: "",
					activitytype:"",
					approved:false

				},
				header: {headers: {'vueid' : localStorage.stravaUuid}},
			};
			
		},
		methods: {
			...mapActions(['getActivityTypesAction']),
			async submitEmail(){
				await this.$store.dispatch('addDestEmailAction', this.myDestEmail)
                await this.$store.dispatch('getDestEmailsAction')
				this.myDestEmail.destemail="";
				this.myDestEmail.destname="";
				this.myDestEmail.activitytype="";
			},

		},
		async created () {
			console.info('Entering Add Email created')
			await this.getActivityTypesAction();
		},
		computed: {
			...mapState(['activityTypes','destEmails'] )
		}
	}
</script>
