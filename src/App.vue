<template>
  <div id="app">
    <div class="locale-changer">
      Idioma / Language:
      <select v-model="$root.$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
      </select>
    </div>
    <div id="nav">
      | <router-link to="/">Home</router-link> |
      <router-link to="/strav">Strava</router-link> |
      <router-link to="/Idealista">Idealista</router-link> |
      <router-link to="/about">{{ $t('app-001') }}</router-link> |
      <router-link to="/Doc">Doc</router-link> | 
    </div>
    <router-view/>
  </div>
  
</template>
<i18n>
{
	"es":{
		"app-001":"Sugerencias"

	}
  ,"en":{
		"app-001":"Suggestions"
	}

}
</i18n>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['es', 'en'] }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
