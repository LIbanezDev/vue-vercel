<template>
    <div>
        <b-row>
          <b-col class="justify-content-center d-flex mb-4">
            <h1> PedidosEats - Node & Vue JS App </h1>
            <br>
            </b-col>
        </b-row>
        <b-row class="d-flex justify-content-center">
          <b-col cols="6" class="border">
            <h2 class="justify-content-center d-flex"> Meals List </h2>
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
                <template v-slot:cell(selected)="{ rowSelected }">
                    <template v-if="rowSelected">
                      <span aria-hidden="true">&check;</span>
                      <span class="sr-only">Selected</span>
                    </template>
                    <template v-else>
                      <span aria-hidden="true">&nbsp;</span>
                      <span class="sr-only">Not selected</span>
                    </template>
              </template>
            </b-table>
              <h2> {{ mealSelected }}</h2>
              <b-form @submit="addOrder">
                <b-button type="submit" variant="primary" size="sm" squared class="mt-4 mb-4">Order Meal...</b-button>
              </b-form>
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
          <b-col cols="5" class="border ml-5">
              <h2 class="justify-content-center d-flex"> Orders </h2>
              <b-table :items="ordersList" :busy="loadingData" class="mt-5" :fields="fieldsOrders" outlined>
              <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading Orders...</strong>
                </div>
              </template>
            </b-table>
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
                loadingData:true,
                mealsList: [],
                ordersList: [],
                btnActivated: false,
                addMealForm:{
                    name: '',
                    desc: '',
                    amount: '',
                    price: '',
                },
                fieldsMeals:['name', 'desc','price'],
                fieldsOrders:['meal_id', 'user_id', 'amount'],
                mealSelected:[],
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
                        fetch('https://serverless-84p4na5tk.vercel.app/api/orders')
                            .then(data => data.json())
                            .then(orders => {
                                this.ordersList = orders;
                                console.log(this.ordersList);
                                this.loadingData = false
                            })
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
            deleteMeal(mealId){
                console.log(mealId)
                fetch(`https://serverless-aq52i3rgo.vercel.app/api/meals/${mealId}`, {
                      method: 'DELETE',
                    })
                    .then(res => {
                        this.CRUDMealAlert = true
                        this.alertVariant = 'danger'
                        console.log(res.status)
                    })
            },
            addOrder(evt){
                evt.preventDefault()
                const orderToAdd = {
                    meal_id:this.mealSelected._id,
                    user_id:"Lucas",
                    amount:"1"
                }
                fetch('https://serverless-aq52i3rgo.vercel.app/api/orders', {
                  method: 'POST', // or 'PUT'
                  body: JSON.stringify(orderToAdd), // data can be `string` or {object}!
                  headers:{
                    'Content-Type': 'application/json'
                  },
                }).then(res => res.json())
                  .then(orderAdded => {
                    this.ordersList.push(orderAdded)
                  })
            },
            onMealSelected(meal) {
                this.mealSelected = meal
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