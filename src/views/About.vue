<template><div class="about"><h1>This is an about page</h1>
	<button @click="getActivityTypes()">Get Activity types</button>
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
		<ul v-if="mybool2">
			<li v-for="email in emails.data" :key="email.rowtableid">
				{{email.activitytype}} {{ email.destemail}} {{email.destname}}
			</li>
		</ul>
	</span>
	<div>
		<h2>Add email to athlete</h2>
		<table>
			<tr>
				<td>Dest email: </td><td><input type="text" id="destemail" v-model="myjobject.destemail"></td>		
			</tr>
			<tr>
				<td>Dest name: </td><td><input type="text" id="destname" v-model="myjobject.destname"></td>		
			</tr>
			<tr>
				<td>Activity:</td>
				<td>
					<select v-if="mybool" v-model="myjobject.activitytype">
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
					activitytype:""

				},
				message: '3656102',
				mybool:true,
				mybool2:false,
				info: [],
				emails: []
			};
			
		},
		methods: {
			getActivityTypes(){
				this.mybool = !this.mybool;
			},
			getAthleteEmails(){
				axios
				.get('https://api.madastur.com/strava/dest-email/'+this.message)
				.then(response => (this.emails = response));
				this.mybool2 = true;
			},
			submitEmail(){
				this.myjobject.athleteid = this.message;
				axios
				.post("https://api.madastur.com/strava/activityemail",this.myjobject);
			}

		},
		created () {
			axios
			.get('https://api.madastur.com/strava/act-types/')
			.then(response => (this.info = response))
		}
	}
</script>
