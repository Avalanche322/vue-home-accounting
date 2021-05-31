<template>
	<ul class="sidenav app-sidenav" :class="{open: value}" >
		<router-link
		v-for="link in links"
		:key="link.url"
		tag="li"
		active-class="active"
		:to="link.url"
		:exact="link.exact"
		>
		<a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
		</router-link>
	</ul>
</template>

<script> 
import localizeFilter from '../../filters/localize.filter'
export default {
	props:['value'],
	data: () => ({
		links:[
			{title: localizeFilter('Menu__Bill' ), url:'/', exact: true},
			{title: localizeFilter('Menu__History' ), url:'/history'},
			{title: localizeFilter('Menu__Planning' ), url:'/planing'},
			{title: localizeFilter('Menu__NewRecord' ), url:'/record'},
			{title: localizeFilter('Menu__Categories' ), url:'/categories'}
		]
	})
}
</script>