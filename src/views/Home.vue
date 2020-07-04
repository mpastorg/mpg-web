<template>
	<div class="home">
		<img src="../assets/logo.jpg">
		<h1 v-bind:title="message">
			<a href="https://www.strava.com/api/v3/oauth/authorize?client_id=48995&scope=activity:read_all&redirect_uri=https://api.madastur.com/strava/auth-mpg/&response_type=code&approval_prompt=auto">Go to Strava.com to authorize this app</a>
		</h1>
		<br/>
		<br/>
		<h1><a href="https://api.madastur.com/strava/act-types">https://api.madastur.com/strava/act-types</a></h1>
		<h1><a href="mailto: marcos@pastorg.es"> Write to marcos@pastorg.es</a></h1>
		<h1><a href="http://www.madastur.com">Insecure http://www.madastur.com</a></h1>
		<h1><a href="https://www.madastur.com">https://www.madastur.com</a></h1>
		<h1><a href="https://www.api.madastur.com">https://www.api.madastur.com</a></h1>
	</div>
</template>

<script>
</script>
