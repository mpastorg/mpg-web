<template><div class="about"><h1>This is an about page</h1><button @click="clickButton()">Button</button>
	<span>
		<h1>some text</h1>
		<input type="input" id="idinput" v-model="message"/>
		<pre>{{ message }}</pre>
		<!--<pre>### {{ info }} ###</pre>-->
	</span>
		<ul v-if="mybool">
			<li v-for="item in info.data" :key="item.rowtableid">
				{{ item.activitytype}} {{item.rowtableid}}
			</li>
		</ul>

  </div>
</template>

<script>
	const axios = require('axios').default;
	export default {
		data() {
			return {
				myjobject: {
					attr: "textattr"
				},
				message: 'textmseeage',
				mybool:false,
				info: []
			};
			
		},
		methods: {
			clickButton(){
				this.message = "changeit";//JSON.stringfy("{'json':'valuej'}"); 
				this.mybool = !this.mybool;
			}
		},
		created () {
			axios
			.get('https://api.madastur.com/strava/act-types/')
			.then(response => (this.info = response))
		}
	}
</script>
