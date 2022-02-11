<template>
    <div>
      <center>Send a few Satoshis to {{athleteUserName}}@madastur.com to test your wallet:
       <br/>
      <vue-qr :text='qrText' qid="testid"></vue-qr>
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
				qrText:'',
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
			console.info('Entering getLnurl mounted')
			this.athleteUserName=localStorage.athleteUserName;
            await this.$store.dispatch('getLnurlAction', localStorage.athleteUserName);
			this.qrText =  this.lnurl.encoded;
        }
	}

</script>
