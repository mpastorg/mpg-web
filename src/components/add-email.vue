<template>
    <div align="center">
		<h3>{{$t('add-001')}} </h3>
		<table align="center">
			<tr hidden='true'>
				<td>Athlete ID: </td><td><span id="athleteid">{{myDestEmail.athleteid}}</span></td>		
			</tr>
			<tr hidden='true'>
				<td>Athlete Name: </td><td><span id="athleteName">{{localAthleteName}}</span></td>		
			</tr>
			<tr>
				<td>{{$t('add-002')}} </td><td><input type="text" id="destemail" v-model="myDestEmail.destemail"/></td>		
			</tr>
			<tr>
				<td>{{$t('add-003')}}</td><td><input type="text" id="destname" v-model="myDestEmail.destname"/></td>		
			</tr>
			<tr>
				<td>{{$t('add-004')}}</td>
				<td>
					<select v-model="myDestEmail.activitytype">
						<option v-for="item in activityTypes" :key="item.rowtableid">
						{{ item.activitytype}}
						</option>
					</select>
				</td>
			</tr>
		</table>
		<center><button @click="submitEmail()">{{$t('add-005')}}</button></center>
	</div>
</template>
<i18n>
{
	"es":{
		"add-001":"Añadir un email para recibir información sobre actividades en tiempo real"
		,"add-002":"Email destinatario:"
		,"add-003":"Apodo (opcional): "
		,"add-004":"Tipo de Actividad (all por defecto):"
		,"add-005":"Añadir email"
        
  },
  "en":{
		"add-001":"Add email to get real time info about your activities"
		,"add-002":"Destination email:"
		,"add-003":"Nickname (optional):"
		,"add-004":"Activity type (optional):"
		,"add-005":"Add the email"
        
        
  }
}
</i18n>

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
