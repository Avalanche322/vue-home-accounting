<template>
	<form class="card auth-card" @submit.prevent="submitHandler">
	<div class="card-content">
		<span class="card-title">{{"EntryTitle" | localize}}</span>
		<div class="input-field">
			<input
				id="email"
				type="text"
				v-model.trim="email"
				:class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
			>
			<label for="email">Email</label>
			<small
			 class="helper-text invalid"
			 v-if="$v.email.$dirty && !$v.email.required"
			 >{{"Messege_EnterEmail" | localize}}
			 </small>
			 <small
			 class="helper-text invalid"
			 v-else-if="$v.email.$dirty && !$v.email.email"
			 >{{"Messege_EnterCorectEmail" | localize}}
			 </small>
		</div>
		<div class="input-field">
			<input
				id="password"
				type="password"
				v-model.trim="password"
				:class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
			>
			<label for="password">{{"Password" | localize}}</label>
			<small 
			class="helper-text invalid"
			v-if="$v.password.$dirty && !$v.password.required"
			>{{"Messege_EnterPassword" | localize}}
			</small>
			<small 
			class="helper-text invalid"
			v-if="$v.password.$dirty && !$v.password.minLength"
			>{{"Messege_MinimumPasswordPart1" | localize}} {{$v.password.$params.minLength.min}} {{"Messege_MinimumPasswordPart2" | localize}}  {{password.length}}
			</small>
		</div>
	</div>
	<div class="card-action">
		<div>
			<button
				class="btn waves-effect waves-light auth-submit"
				type="submit"
			>
			{{"Enter" | localize}}
			<i class="material-icons right">send</i>
			</button>
		</div>

		<p class="center">
			{{"NoHaveAccount" | localize}}
			<router-link to="/register">{{"Register" | localize}}</router-link>
		</p>
	</div>
	</form>
</template>

<script>
import {email,required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utilus/messages'
import localizeFilter from '@/filters/localize.filter'

export default {
	name: 'login',
	metaInfo(){
		return{
			title: this.$title('LoginTitle')
		}
	},
	data: () =>({
		email: '',
		password: ''
	}),
	validations:{
		email:{email, required},
		password:{required, minLength: minLength(8)}
	},
	mounted(){
		if(messages[this.$route.query.message]){
			this.$message(localizeFilter(messages[this.$route.query.message]))
		}
	},
	methods:{
		async submitHandler(){
			if(this.$v.$invalid){
				this.$v.$touch()
				return
			}
			const formData = {
				email: this.email,
				password: this.password
			}
			try{
				await this.$store.dispatch('login', formData)
				this.$router.push('/')
			} catch(e){}
		}
	}
}
</script>