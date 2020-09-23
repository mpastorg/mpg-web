<template>
	<div class="about">
		<center>
			<table>
				<tr>
					<td>Tu email pare responderte:</td>
					<td><input type="text" id="clientemail" size="33" maxlength="50" v-model="clientComments.clientemail"/></td>
				</tr>
				<tr>
					<td>Tus comentarios o sugerencias:</td>
					<td><textarea id="comments" rows="5" cols="33" maxlength="1000" v-model="clientComments.clientcomment"/></td>
				</tr>
				<tr><td colspan="2" align="center"><input type="button" @click="sendForm()" value="Enviar"/></td></tr>
			</table>
		</center>
	</div>	
</template>

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
