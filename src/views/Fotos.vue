<template>
  <div>
    <h1> Galeria de fotos </h1>
    <router-link :to="{ name:'Fotos', params: {id: foto}} " v-for="foto of fotos" v-bind:key="foto.id">
      <button :class="['text-danger']"> {{ foto }}</button>
    </router-link>
    <router-link :to="{name:'Home'}">
      <button :class="[isGreen ? 'btn-success' : 'btn-danger']">Ir a home </button>
    </router-link>
    <Foto />
  </div>
</template>
<script>

import Foto from "../components/Fotografia.vue"

export default {
  name: 'Fotos',
  components:{
    Foto  
  },
  data(){
    return{
      fotos: [1,2,3],
      isGreen: true
    }
  }
}
</script>