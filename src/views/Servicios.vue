<template>
    <div>
        <b-row>
          <b-col class="justify-content-center d-flex mb-4">
            <h1> PedidosEats - Node & Vue JS App </h1>
            <br>
            </b-col>
        </b-row>
        <b-row>
          <b-col cols="8">
            <h2 class="justify-content-center d-flex"> Meals List </h2>
            <b-button
                    :variant="btnColor"
                    @click="btnActivated = !btnActivated"
                    squared
                    size="sm">
              {{ btnActivated ? 'Close Form' : 'Show Form' }} </b-button>
            <form @submit="addMeal" v-if="btnActivated" class="mt-4 mb-4">
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
              <b-button type="submit" variant="primary" size="sm" squared>Add Meal</b-button>
            </form>

            <b-list-group class="mt-4 mb-4">
                <b-spinner label="Spinning" v-if="showSpinner"></b-spinner>
                <b-list-group-item v-for="(meal, index) in mealsList" :key="index">
                    {{ meal._id }} - {{index+1}}. {{ meal.name }} - {{ meal.desc }}
                    <b-button-group class="ml-5" size="sm">
                        <b-button squared variant="success">Edit</b-button>
                        <b-button squared variant="danger" @click="deleteMeal(meal._id, index)">Delete</b-button>
                    </b-button-group>
                </b-list-group-item>
            </b-list-group>

            <!-- CRUD meal alerts -->
            <b-alert
              :variant="alertVariant"
              dismissible
              fade
              :show="CRUDMealAlert"
              @dismissed="CRUDMealAlert=false"
            >
              {{ alertText }}
            </b-alert>

          </b-col>
          <b-col cols="4">
            <h2 class="justify-content-center d-flex"> Orders </h2>
          </b-col>
        </b-row>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.getMeals()
        },
        data() {
            return {
                showSpinner: true,
                mealsList: [],
                ordersList: [],
                btnActivated: false,
                addMealForm:{
                  name: '',
                  desc: ''
                },
                CRUDMealAlert:false,
                alertVariant:''
            }
        },
        methods: {
            getMeals() {
                fetch('https://serverless-aq52i3rgo.vercel.app/api/meals')
                    .then(res => res.json())
                    .then(meals => {
                        this.mealsList = meals;
                        this.showSpinner = false
                    })
            },
            addMeal(evt) {
                evt.preventDefault()
                fetch('https://serverless-aq52i3rgo.vercel.app/api/meals', {
                  method: 'POST', // or 'PUT'
                  body: JSON.stringify(this.addMealForm), // data can be `string` or {object}!
                  headers:{
                    'Content-Type': 'application/json'
                  }
                }).then(res => res.json())
                  .then(mealAdded => {
                    this.CRUDMealAlert = true
                    this.alertVariant = 'success'
                    this.mealsList.push(mealAdded)
                    this.btnActivated = false
                  })
            },
            deleteMeal(mealId, index){
              fetch(`https://serverless-aq52i3rgo.vercel.app/api/meals/${mealId}`, {
                    method: 'DELETE',
                  })
                  .then(res => {
                      this.CRUDMealAlert = true
                      this.alertVariant = 'danger'
                      console.log(res.status)
                      console.log(mealId)
                      this.mealsList.splice(index, 1);
                  })
            },
            getOrders(){
                fetch('https://serverless-aq52i3rgo.vercel.app/api/meals')
                    .then(res => res.json())
                    .then(orders => {
                      this.ordersList = orders
                    })
            },
        },
        computed:{
          btnColor(){
            if(this.btnActivated) return 'danger'
            return 'success'
          },
          alertText(){
            if(this.alertVariant === 'success') return 'Your meal has been successfully created'
            if(this.alertVariant === 'warning') return 'Meal has been successfully edited'
            return 'Meal has been successfully deleted'
          }
        }


    }
</script>