<template>
  <div><center>
      lnurl:
      <br/>
      {{strLnurl}}
  </center></div>
</template>

<style lang="scss" scoped>
</style>

<script>
	import { mapState, mapActions } from 'vuex';
	export default {
		name: "Lnurl",
		data() {
			return {
                strLnurl:"",
			};
			
		},
		methods: {
			...mapActions(['getLnurlAction']),
		},
		async created () {
			console.info('Entering getLnurl created')
			await this.getLnurlAction(localStorage.athleteUserName).then(
                ln => {this.strLnurl = ln}
            ).catch(() => {this.strLnurl = "error strLnurl: " + localStorage.athleteUserName});
		},
		computed: {
			...mapState(['lnurl'] )
		}
	}
</script>
