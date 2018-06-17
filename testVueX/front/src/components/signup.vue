<template>
	<div>
		<input type="text" name="user.username" v-model="user.username" />
		<input type="text" name="user.password" v-model="user.password" />
		<button v-on:click="signIn">Envoyer</button><br/>
		{{users}}
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
	  name: 'HelloWorld',
	  data () {
	    return {
	      msg: 'Sign In',
	      user: {},
	      users: []
	    }
	  },
	  methods: {
	  	signIn: function(){
	  		axios.post('http://localhost:8000/signup',this.user).then(function(res){
	  			this.users = res.data;
	  		})
	  	}
	  }

	}
</script>

<style>
	
</style>