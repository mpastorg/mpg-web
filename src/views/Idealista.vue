<template>
	<div class="Idealista">
		<center>
			<table>
				<tr>
					<td>Tu email:</td>
					<td><input type="text" id="clientemail" size="33" maxlength="50" v-model="clientComments.clientemail"/></td>
				</tr>
				<tr>
					<td>Metros Cuadrados:</td>
					<td><input type="text" id="size" size="33" maxlength="10" v-model="home.size"/></td> 
				</tr>
				<tr>
					<td>Número Habitaciones:</td>
					<td><input type="text" id="rooms" size="33" maxlength="3" v-model="home.rooms"/></td> 
				</tr>
				<tr>
					<td>Número Baños:</td>
					<td><input type="text" id="bathrooms" size="33" maxlength="3" v-model="home.bathrooms"/></td> 
				</tr>
				<tr>
					<td>Tipo propiedad:</td>
					<td><select id="propertyType" v-model="home.propertyType">
							<option value="flat" selected>Apartamento</option>
							<option value="chalet">Chalet</option>
							<option value="duplex">Duplex</option>
							<option value="studio">Estudio</option>
							<option value="penthouse">Atico</option>
							<option value="countryHouse">Casa campo</option>
						</select>
					</td> 
				</tr>
				<tr>
					<td>Municipio:</td>
					<td><select id="municipality" v-model="home.municipality">
							<option value="Madrid" selected="selected">Madrid</option>
							<option value="Villaviciosa de Odón">Villaviciosa de Odón</option>
							<option value="Móstoles">Móstoles</option>
							<option value="Alcorcón">Alcorcón</option>
							<option value="Villanueva de la Cañada">Villanueva de la Cañada</option>
							<option value="Las Rozas de Madrid">Las Rozas de Madrid</option>
							<option value="Pozuelo de Alarcón">Pozuelo de Alarcón</option>
							<option value="Brunete">Brunete</option>
							<option value="Majadahonda">Majadahonda</option>
							<option value="Leganés">Leganés</option>
						</select>
					</td> 
				</tr>
				<tr><td colspan="2" align="center"><input type="button" @click="sendForm()" value="Enviar"/></td>
				</tr>
			</table>
			<table>
				<tr>
					<td>El valor de tu casa es:</td>
					<td><span id="homevalue" size="33" maxlength="50" >{{homevalue}}</span></td>
				</tr>
			</table>
		</center>
	</div>	
</template>

<script>
import { data } from '../shared';

export default {
  name: "Idealista",
  data() {
    return {
		home:{
			size:100,
			rooms:4,
			bathrooms:2,
			propertyType:'flat',
			municipality:'Madrid'
		},
		homevalue: '',
		clientComments:{
			clientemail:'',
			clientcomment:''
		}

	}
  },
	methods: {
		async sendForm(){
			if (this.clientComments.clientemail=="" || this.clientComments.clientemail == undefined){
				alert("Introduce your email")
			} else{
				var strhome = '{"examples":[{"size":' + Math.log(this.home.size) + ', "rooms":'
				+ parseFloat(this.home.rooms).toFixed(1) + ', "bathrooms":' + parseFloat(this.home.bathrooms).toFixed(1) + ', "propertyType":"' 
				+ this.home.propertyType + '", "municipality":"' + this.home.municipality + '"}' + ']}'
				console.info(strhome)
				const localhomevalue = await data.addHome(strhome);
				console.info(localhomevalue["results"])
				this.homevalue=Math.exp(localhomevalue["results"][0]).toFixed(0) + " EUR";
				this.clientComments.clientcomment = strhome
				await data.addComments(this.clientComments);
			}
		},

	}
}
</script>
