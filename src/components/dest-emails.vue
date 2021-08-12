<template>    
    <div>
        <div>
		<table>
            <tbody>
                <tr>
                    <td>
                        <button @click="getAthleteEmails()">Get Athlete emails</button>
                    </td>
                    <td>
                        <a :href="'https://react.madastur.com/strava/activities/'+myDestEmail.athleteId"> Go to list of Activities</a>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
		<div>
			<br/>
			<table align="center">
				<tr v-for="email in destEmails" :key="email.rowtableid">
					<td>{{email.activitytype}}</td>
					<td>{{ email.destemail}}</td>
					<td>{{email.destname}}</td>
					<td>{{email.approved}}</td>
					<td><button @click="deleteEmail(email.rowtableid)">Delete email</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button v-if="email.approved === false"  @click="reSendEmail(email.rowtableid)">Re-Send email</button></td>
				</tr>	
			</table>
		</div>  
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
        console.info('Entering created dest-emails')
    },
    computed: {
        ...mapState(['destEmails'] )
    }

}
</script>
