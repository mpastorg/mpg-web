<template>
	<div class="about">
		<center>
			<table>
				<tr>
					<td>{{ $t('about-001') }}</td>
				</tr>
				<tr>
					<td><input type="text" id="clientemail" size="33" maxlength="50" v-model="clientComments.clientemail"/></td>
				</tr>
				<br/>
				<tr>
					<td>{{ $t('about-002') }}</td>
				</tr>
				<tr>
					<td><textarea id="comments" rows="5" cols="33" maxlength="1000" v-model="clientComments.clientcomment"/></td>
				</tr>
				<br/><tr><td align="center"><input type="button" @click="sendForm()" :value="$t('about-006')"/></td></tr>
			</table>
			<p>
				{{ $t('about-003') }} <a href="https://github.com/mpastorg/strava-client-comments">{{ $t('about-005') }}</a>
				<br/><br/>
				{{ $t('about-004') }}
				
			</p>
		</center>
	</div>	
</template>
<i18n>
{
	"en":{
		"about-001":"Add your email to get an answer:"
		,"about-002":"Your feedback or suggestions:"
		,"about-003":"Source code server side "
		,"about-004":"*** Not for you to learn, this is How I learnt how to code many years later"
		,"about-005":"here "
		,"about-006":"Submit"
	},
	"es":{
		"about-001":"Tu email para responderte:"
		,"about-002":"Tus comentarios o sugerencias:"
		,"about-003":"Código fuente servidor "
		,"about-004":"*** Nada que aprender, es lo que yo hice para volver a programar algo después de muchos años"
		,"about-005":"aquí "
		,"about-006":"Enviar"
		

	}

}
</i18n>

<script>
import { data } from '../shared';

export default {
  name: "About",
  data() {
    return {
		clientComments:{
			clientemail:'',
			clientcomment:''
		}
	}
  },
	methods: {
		async sendForm(){
			console.info("enter sendForm")
			await data.addComments(this.clientComments);
			this.clientComments.clientemail="";
			this.clientComments.clientcomment="";
		},

	}
}
</script>
