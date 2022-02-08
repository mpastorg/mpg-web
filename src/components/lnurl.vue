<template>
    <div>
      <center>Send a few Satoshis to {{athleteUserName}}@madastur.com to test your wallet:
       <br/>
      <vue-qr :text='lnurl.encoded' :callback="test" qid="testid"></vue-qr>
    </center>
    </div>
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
                athleteUserName:localStorage.athleteUserName,
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
