<template>
	<div>
	<div class="page-title">
		<h3>{{'ProfileTitle' | localize}}</h3>
	</div>

	<form class="form" @submit.prevent="submitHandler">
		<div class="input-field">
			<input
				id="description"
				type="text"
				v-model = "name"
				:class="{invalid: $v.name.$dirty && !$v.name.required}"
			>
			<label for="description">{{'Name' | localize}}</label>
			<small
			 class="helper-text invalid"
			 v-if="$v.name.$dirty && !$v.name.required"
			 >{{'Message_EnterName' | localize}}
			 </small>
		</div>
		 <!-- Switch -->
		<div class="switch">
			<label>
				English
				<input type="checkbox" v-model="isUkLocale">
				<span class="lever"></span>
				Український
			</label>
		</div>
		<button class="btn waves-effect waves-light" type="submit">
			{{'Update' | localize }}
			<i class="material-icons right">send</i>
		</button>
	</form>
	</div>
</template>
<style scoped>
.switch{
	margin-bottom: 2rem;
}
</style>

<script>
import {mapGetters, mapActions} from 'vuex'
import {required} from 'vuelidate/lib/validators'
import localizeFilter from '../filters/localize.filter'
export default {
	metaInfo(){
		return{
			title: this.$title('ProfileTitle')
		}
	},
	name: 'profile',
	data: () => ({
		name: '',
		isUkLocale : true
	}),
	validations:{
		name:{required}
	},
	mounted(){
		this.name = this.info.name
		this.isUkLocale = this.info.locale === 'uk-UK'
		setTimeout(() => {
			M.updateTextFields()
		})
		
	},
	methods:{
		...mapActions(['updateInfo']),
		async submitHandler(){
			if(this.$v.$invalid){
				this.$v.$touch()
				return
			}
			try{
				await this.updateInfo({
					name: this.name,
					locale: this.isUkLocale ? 'uk-UK' : 'en-US'
				})
			} catch(e){}
		}
	},
	computed:{
		...mapGetters(['info'])
	}
}
</script>