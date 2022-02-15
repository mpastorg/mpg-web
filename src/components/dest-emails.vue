<template>    
    <div>
        <center>
            <h3>
                 Historia de tus actividades
            </h3>
            <p> Cada vez que hagas una nueva actividad, la añadimos <a :href="'https://react.madastur.com/strava/activities/'+tempId">aquí</a> para que puedas consutarlas.
                <br/> <br/>
                <b>Aviso importante: No están protegidas y cualquiera puede verlas.</b>
            </p>
            <h3>Emails que reciben tus actividades
            </h3>
            <table align="center">
                <tr>
                    <td>Tipo Actividad</td>
                    <td>Email</td>
                    <td>Nombre</td>
                    <td>Confirmación</td>
                    <td>Borrar</td>
                </tr>
				<tr v-for="email in destEmails" :key="email.rowtableid">
					<td>{{email.activitytype}}</td>
					<td>{{ email.destemail}}</td>
					<td>{{email.destname}}</td>
					<td>{{email.approved}}</td>
					<td><button @click="deleteEmail(email.rowtableid)">Delete email</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button v-if="email.approved === false"  @click="reSendEmail(email.rowtableid)">Re-Send email</button></td>
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
