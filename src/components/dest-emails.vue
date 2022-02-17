<template>    
    <div>
        <center>
            <h3>
                 Historia de tus actividades
            </h3>
            <p> Cada vez que hagas una nueva actividad, la añadimos <a :href="'https://react.madastur.com/strava/activities/'+tempId">aquí</a> para que puedas consutarlas.
                <br/> <br/>
                <b><span style="color: red">Aviso importante: No están protegidas y cualquiera puede verlas.</span></b>
            </p>
            <!-- TODO: borrado lógico de todas las actividades --> 
            <h3>Emails que reciben tus actividades
            </h3>
            <table align="center" style="text-align: center">
                <tr>
                    <td>Tipo</td>
                    <td>Email</td>
                    <td>Borrar / Re-enviar</td>
                </tr>
				<tr v-for="email in destEmails" :key="email.rowtableid">
					<td>{{email.activitytype}}</td>
					<td v-if="email.approved === true"> {{ email.destemail}}</td>
					<td v-else style="color:red"> {{ email.destemail}}</td>
					<td><center><button @click="deleteEmail(email.rowtableid)">Borrar</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button v-if="email.approved === false"  @click="reSendEmail(email.rowtableid)">Re-enviar email</button></center></td>
				</tr>	
			</table>
        </center>
    </div>
</template>

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