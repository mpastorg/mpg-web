<template>
	<div class="about">
	<button @click="getActivityTypes()" v-if="mybool">Get Activity types</button>
		<ul v-if="mybool">
			<li v-for="item in info.data" :key="item.rowtableid">
				{{ item.activitytype}} {{item.rowtableid}}
			</li>
		</ul>
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
						<option v-for="item in info.data" :key="item.rowtableid">
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
	const axios = require('axios').default;
	export default {
		data() {
			return {
				myjobject: {
					athleteid: this.message,
					destemail: "",
					destname:"",
					activitytype:"",
					approved:false

				},
				message: '3656102',
				mybool:false,
				mybool2:false,
				info: [],
				emails: []
			};
			
		},
		methods: {
			getActivityTypes(){
				this.mybool = !this.mybool;
			},
			async getAthleteEmails(){
				await axios
				.get('https://api.madastur.com/strava/dest-email/'+this.message)
				.then(response => (this.emails = response));
				this.mybool2 = true;
			},
			async submitEmail(){
				//this.mybool2 = false;
				this.myjobject.athleteid = this.message;
				await axios
				.post("https://api.madastur.com/strava/activityemail",this.myjobject);
				this.getAthleteEmails();
			},
			async deleteEmail(rowtableid){
				//this.mybool2 = false;
				await axios
				.delete("https://api.madastur.com/strava/del-email/"+rowtableid+"/")
				this.getAthleteEmails();

			}

		},
		created () {
			axios
			.get('https://api.madastur.com/strava/act-types/')
			.then(response => (this.info = response))
		}
	}
</script>
