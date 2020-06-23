<!--suppress JSValidateTypes -->
<template>
    <div>
    <h2 class="text-center"> Meals List </h2>
        <b-button
                :variant="btnColor"
                @click="btnActivated = !btnActivated"
                squared
                size="sm">
          {{ btnActivated ? 'Close Form' : 'Show Form' }} </b-button>
        <b-form @submit="addMeal" v-if="btnActivated" class="mt-4 mb-4">
          <b-form-group label="Meal Name:" label-for="name">
            <b-form-input
              id="name"
              v-model="addMealForm.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Meal Description:" label-for="desc">
            <b-form-input
              id="desc"
              v-model="addMealForm.desc"
              required
              placeholder="Enter description"
            ></b-form-input>
          </b-form-group>
            <b-form-group label="Amount" label-for="desc">
            <b-form-input
              id="desc"
              v-model="addMealForm.desc"
              required
              placeholder="Enter description"
            ></b-form-input>
          </b-form-group>
            <b-form-group label="Price:" label-for="desc">
            <b-form-input
              id="desc"
              v-model="addMealForm.desc"
              required
              placeholder="Enter description"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" size="sm" squared>Add Meal</b-button>
        </b-form>

        <b-table
                ref="selectableTable"
                select-mode="single"
                selectable
                @row-selected="onMealSelected"
                :items="mealsList"
                :busy="loadingData"
                class="mt-3"
                :fields="fieldsMeals"
                outlined>
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading Meals...</strong>
            </div>
          </template>
        </b-table>

        <AddOrderForm :mealSelected="mealSelected" v-if="mealSelected"></AddOrderForm>

        <b-button variant="danger" size="sm" squared class="mt-4 mb-4" @click="signOff">Sign off</b-button>
        <!-- CRUD meal alerts -->
        <b-alert
          :variant="alert.variant"
          dismissible
          fade
          :show="alert.show"
          @dismissed="alert.show=false"
        >
          {{ alert.text }}
        </b-alert>
        </div>
</template>

<script>
    import axios from 'axios'
    import {mapState, mapMutations} from 'vuex';
    import AddOrderForm from "../orders/AddOrderForm";

    export default {
        name: "Register",
        components: {AddOrderForm},
        mounted() {
          this.getData()
        },
        data(){
            return{
                addMealForm:{
                    name: '',
                    desc: '',
                    amount: '',
                    price: '',
                },
                alert:{
                    show:false,
                    variant:'',
                    text:''
                },
                mealSelected:{},
                fieldsMeals:['name', 'desc','price'],
                btnActivated: false,
            }
        },
        methods:{
            ...mapMutations(["setMealsList", "setOrderList", "isNotLoading", "changeUserState"]),
            getData() {
                axios.get('https://serverless-tan-theta.vercel.app/api/meals', {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                })
                    .then(meals => {
                        this.setMealsList(meals.data)
                        axios.get('https://serverless-tan-theta.vercel.app/api/orders', {
                            headers: {
                                authorization: localStorage.getItem('token')
                            }
                        })
                            .then(orders => {
                                this.setOrderList(orders.data)
                                this.isNotLoading()
                            })
                    })
            },
            addMeal(evt) {
                evt.preventDefault()
                axios.post('https://serverless-aq52i3rgo.vercel.app/api/meals', this.addMealForm, {
                    headers:{
                        authorization: localStorage.getItem('token')
                    }
                })
                    .then(mealAdded => {
                        this.alert.show = true
                        this.alert.variant = 'success'
                        this.alert.text = 'Meal successfully added'
                        this.mealsList.push(mealAdded.data)
                        this.btnActivated = false
                    })
            },
            onMealSelected(meal) {
                this.mealSelected = meal[0]
            },
            signOff(){
                localStorage.removeItem('token')
                localStorage.removeItem('userData')
                this.changeUserState(false)
                window.location.href = "/login";
            }
        },
        computed:{
            ...mapState(["mealsList", "loadingData"]),
            btnColor(){
                if(this.btnActivated) return 'danger'
                return 'success'
            },
        }
    }
</script>

<style scoped>

</style>