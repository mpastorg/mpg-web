<template>
	<div class="Idealista">
		<center>
			<table>
				<tr>
					<td>{{$t('ideal-001')}}</td>
					<td><input type="text" id="clientemail" size="33" maxlength="50" v-model="clientComments.clientemail"/></td>
				</tr>
				<tr>
					<td>{{$t('ideal-002')}}</td>
					<td><input type="text" id="size" size="33" maxlength="10" v-model="home.size"/></td> 
				</tr>
				<tr>
					<td>{{$t('ideal-003')}}</td>
					<td><input type="text" id="rooms" size="33" maxlength="3" v-model="home.rooms"/></td> 
				</tr>
				<tr>
					<td>{{$t('ideal-004')}}</td>
					<td><input type="text" id="bathrooms" size="33" maxlength="3" v-model="home.bathrooms"/></td> 
				</tr>
				<tr>
					<td>{{$t('ideal-005')}}</td>
					<td><select id="propertyType" v-model="home.propertyType">
							<option value="flat" selected>{{$t('ideal-006')}}</option>
							<option value="chalet">{{$t('ideal-007')}}</option>
							<option value="duplex">{{$t('ideal-008')}}</option>
							<option value="studio">{{$t('ideal-009')}}</option>
							<option value="penthouse">{{$t('ideal-010')}}</option>
							<option value="countryHouse">{{$t('ideal-011')}}</option>
						</select>
					</td> 
				</tr>
				<tr>
					<td>{{$t('ideal-012')}}</td>
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
				<tr><td colspan="2" align="center"><input type="button" @click="sendForm()" :value="$t('ideal-013')"/></td>
				</tr>
			</table>
			<table>
				<tr>
					<td>{{$t('ideal-014')}}</td>
					<td><span id="homevalue" size="33" maxlength="50" >{{homevalue}}</span></td>
				</tr>
			</table>
		</center>
	</div>	
</template>
<i18n>
{
	"es":{
		"ideal-001":"Tu email:"
		,"ideal-002":"Metros Cuadrados:"
		,"ideal-003":"Número Habitaciones:"
		,"ideal-004":"Número Baños:"
		,"ideal-005":"Tipo propiedad:"
		,"ideal-006":"Apartamento"
		,"ideal-007":"Chalet"
		,"ideal-008":"Duplex"
		,"ideal-009":"Estudio"
		,"ideal-010":"Ático"
		,"ideal-011":"Casa de campo"
		,"ideal-012":"Municipio:"
		,"ideal-013":"Enviar"
		,"ideal-014":"El valor de tu casa es:"
		,"ideal-015":"Introduce tu email"
	}
	,"en":{
		"ideal-001":"Your email:"
		,"ideal-002":"Square meters:"
		,"ideal-003":"Number of rooms:"
		,"ideal-004":"Number of bathrooms:"
		,"ideal-005":"Property type:"
		,"ideal-006":"Flat"
		,"ideal-007":"Chalet"
		,"ideal-008":"Duplex"
		,"ideal-009":"Study"
		,"ideal-010":"Penthouse"
		,"ideal-011":"Cottage"
		,"ideal-012":"Neighborhood:"
		,"ideal-013":"Submit"
		,"ideal-014":"Your house price value is about:"
		,"ideal-015":"Introduce your email"
	}
}
</i18n>
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
				alert(this.$i18n.t('ideal-015'))
			} else{
				var strhome = '{"examples":[{"size":' + Math.log(this.home.size) + ', "rooms":'
				+ parseFloat(this.home.rooms).toFixed(1) + ', "bathrooms":' + parseFloat(this.home.bathrooms).toFixed(1) + ', "propertyType":"' 
				+ this.home.propertyType + '", "municipality":"' + this.home.municipality + '"}' + ']}'
				console.info(strhome)
				const localhomevalue = await data.addHome(strhome);
				console.info(localhomevalue["results"])
				this.homevalue=Math.exp(localhomevalue["results"][0]).toFixed(0) + " EUR";
			}
		},

	}
}
</script>
