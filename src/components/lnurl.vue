<template>
    <div>
      <center>Send a few Satoshis to {{athleteUserName}}@madastur.com to test your wallet:
       <br/>
      <vue-qr :text='lnurl.encoded' qid="testid"></vue-qr>
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
			...mapActions(['getLnurlAction'])
		},
		async created () {
			console.info('Entering getLnurl created')
                    },
		computed: {
			...mapState(['lnurl'] )
		}, 
        async mounted(){
             await this.$store.dispatch('getLnurlAction', localStorage.athleteUserName)
        }
	}

</script>
