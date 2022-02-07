<template>
  <div><center>
      lnurl:
      <br/>
      {{lnurl}}
      <br/>
      <vue-qr :text=lnurl.callback :callback="test" qid="testid"></vue-qr>
  </center></div>
</template>

<style lang="scss" scoped>
</style>

<script>
    import VueQr from 'vue-qr';
	import { mapState, mapActions } from 'vuex';
    
	export default {
		name: "Lnurl",
        components: {VueQr},
        data() {
			return {
                strLnurl:"",
			};
			
		},
		methods: {
			...mapActions(['getLnurlAction']),
		},
        test(dataUrl,id){
            console.log(dataUrl, id)
            
        },
		async created () {
			console.info('Entering getLnurl created')
            await this.$store.dispatch('getLnurlAction', localStorage.athleteUserName)
            /*
			await this.getLnurlAction(localStorage.athleteUserName).then(
                ln => {this.strLnurl = ln}
            ).catch(() => {this.strLnurl = "error strLnurl: " + localStorage.athleteUserName});
            */
        },
		computed: {
			...mapState(['lnurl'] )
		}
	}
</script>
