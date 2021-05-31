import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import tooltipDirective from './directives/tootip.directive'
import dateFilter from './filters/date.filter'
import messagePlugin from './utilus/message.plugin'
import titlePlugin from './utilus/title.plugin'
import Loader from './components/app/Loader'
import VueMeta from 'vue-meta'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuetify)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
	apiKey: "AIzaSyB_auneHaHLYXUHoA7YCislm2VbeoM2zA4",
	authDomain: "vue-project-accounting.firebaseapp.com",
	projectId: "vue-project-accounting",
	storageBucket: "vue-project-accounting.appspot.com",
	messagingSenderId: "459389224439",
	appId: "1:459389224439:web:ce99c384bd23e2cb4bdaf2",
	measurementId: "G-9WNQDHKDD0"
})

let app

firebase.auth().onAuthStateChanged(() =>{
	if(!app){
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}
})
