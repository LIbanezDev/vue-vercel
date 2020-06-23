import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mealsList: [],
    ordersList: [],
    isUserLogged: false,
    loadingData: true,
  },
  mutations: {
    setMealsList(state, meals){
      state.mealsList = meals;
    },
    setOrderList(state, orders){
      state.ordersList = orders
    },
    isNotLoading(state){
      state.loadingData = false
    },
    addOrder(state, order){
      state.ordersList.push(order)
    },
    changeUserState(state, isLogged){
      state.isUserLogged = isLogged
    },
  },
  actions: {

  },
  modules: {
  }
})
