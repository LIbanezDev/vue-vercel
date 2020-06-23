<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <div class="container">
        <b-navbar-brand>
          <img src="@/assets/chile.png" height="35" width="35" class="d-inline-block align-top" alt="Kitten">
          League of Devs Chile
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{name:'PedidosEats'}"> Pedidos Eats </b-nav-item>
            <b-nav-item :to="{name:'Fotos'}">Fotos</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <b-container>     
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
}
</script>