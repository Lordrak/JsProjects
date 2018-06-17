<template>
  <div class="hello">
    Test Component <br/>
    {{getCount}}
    <button v-on:click="addCount">plus</button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
        
    }
  },
  methods: {
  	addCount() {
  		this.$store.commit("increment");
  	} 
  },
  computed: {
  	...mapGetters(['getCount'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
