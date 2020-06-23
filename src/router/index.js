import Vue from 'vue'
import VueRouter from 'vue-router'
import PedidosEats from "../views/PedidosEats";
import Fotos from "../views/Fotos"
import Login from "../components/pedidoseats/auth/Login"
import Register from "../components/pedidoseats/auth/Register"

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'PedidosEats',
      component: PedidosEats,
        children:[
          {
            path: 'register',
            name: 'Register',
            component: Register
          },
          {
            path: 'login',
            name: 'Login',
            component: Login
          }
        ]

    },
    {
      path: '/fotos/:id?',
      name: 'Fotos',
      component: Fotos
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
