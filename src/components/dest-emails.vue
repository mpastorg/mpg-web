<template>    
    <div>
        <center>
            <h3>
                {{$t('dest-001')}}
            </h3>
            <p> {{$t('dest-002')}} <a :href="'https://react.madastur.com/strava/activities/'+tempId">{{$t('dest-003')}}</a> 
                {{$t('dest-004')}}
                <br/> <br/>
                <b><span style="color: red">{{$t('dest-005')}}</span></b>
            </p>
            <!-- TODO: borrado lógico de todas las actividades --> 
            <h3>{{$t('dest-006')}}
            </h3>
            <table align="center" style="text-align: center">
                <tr>
                    <td>{{$t('dest-007')}}</td>
                    <td>Email</td>
                    <td>{{$t('dest-008')}}</td>
                </tr>
				<tr v-for="email in destEmails" :key="email.rowtableid">
					<td>{{email.activitytype}}</td>
					<td v-if="email.approved === true"> {{ email.destemail}}</td>
					<td v-else style="color:red"> {{ email.destemail}}</td>
					<td><center><button @click="deleteEmail(email.rowtableid)">{{$t('dest-009')}}</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button v-if="email.approved === false"  @click="reSendEmail(email.rowtableid)">{{$t('dest-010')}}</button></center></td>
				</tr>	
			</table>
        </center>
    </div>
</template>
<i18n>
{
	"es":{
		"dest-001":"Historia de tus actividades"
		,"dest-002":"Cada vez que hagas una nueva actividad, la añadimos "
        ,"dest-003":"aquí "
        ,"dest-004":"para que tú u otros podáis consutarlas."
        ,"dest-005":"Aviso importante: No están protegidas y cualquiera puede verlas."
        ,"dest-006":"Lista de quién recibe un email sobre tus actividades:"
        ,"dest-007":"Tipo"
        ,"dest-008":"Borrar / Re-enviar"
        ,"dest-009":"Borrar"
        ,"dest-010":"Re-enviar email"
  },
  "en":{
		"dest-001":"Your activity history is here"
		,"dest-002":"Your Strava activities are being added "
        ,"dest-003":" here "
        ,"dest-004":"for you or others to see them. "
        ,"dest-005":"Critical warning: No privacy, anyone can come and see this information."
        ,"dest-006":"List of people getting an email with your activities:"
        ,"dest-007":"Type"
        ,"dest-008":"Delete / Re-send"
        ,"dest-009":"Delete"
        ,"dest-010":"Re-send email"
  }
}
</i18n>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: "destEmails",
    data() {
        return {
            myDestEmail: {
                athleteid: localStorage.athleteId,
                destemail: "",
                destname:"",
                activitytype:"",
                approved:false

            },
            tempId: localStorage.athleteId,
            emails: []
        };
        
    },
    methods: {
        ...mapActions(['getActivityTypesAction','getDestEmailsAction']),
        async getAthleteEmails(){
           await this.$store.dispatch('getDestEmailsAction')
        },
        async deleteEmail(rowtableid){
            await this.$store.dispatch('deleteDestEmailAction',rowtableid);
            this.getAthleteEmails();
        },
        async reSendEmail(rowtableid){
            await this.$store.dispatch('reSendDestEmailAction',rowtableid);
            
        }
    },
    async created () {
        console.info('Entering created dest-emails');
        await this.getAthleteEmails();
    },
    computed: {
        ...mapState(['destEmails'] )
    }

}
</script>
<style lang="css" scoped>
td {
    text-align: center;
}
</style>