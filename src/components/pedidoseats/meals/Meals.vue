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
          <h2> {{ mealSelected }}</h2>
          <b-form @submit="addOrder">
            <b-button type="submit" variant="primary" size="sm" squared class="mt-4 mb-4" disabled>Order Meal...</b-button>
          </b-form>
        <b-button variant="danger" size="sm" squared class="mt-4 mb-4" @click="signOff">Sign off</b-button>
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
        </div>
</template>

<script>

    import {mapState, mapMutations} from 'vuex';

    export default {
        name: "Register",
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
                fieldsMeals:['name', 'desc','price'],
                mealSelected:[],
                CRUDMealAlert:false,
                alertVariant:'',
                btnActivated: false,
            }
        },
        methods:{
            ...mapMutations(["setMealsList", "setOrderList", "isNotLoading", "changeUserState"]),
            getData() {
                fetch('https://serverless-aq52i3rgo.vercel.app/api/meals')
                    .then(res => res.json())
                    .then(meals => {
                        this.setMealsList(meals)
                        fetch('https://serverless-84p4na5tk.vercel.app/api/orders')
                            .then(data => data.json())
                            .then(orders => {
                                this.setOrderList(orders)
                                this.isNotLoading()
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
            addOrder(evt){
                evt.preventDefault()
            },
            onMealSelected(meal) {
                this.mealSelected = meal
            },
            signOff(){
                localStorage.removeItem('token')
                localStorage.removeItem('userData')
                this.changeUserState(false)
                window.location.href = "https://vue-tqsr4s550.vercel.app/";
            }
        },
        computed:{
            ...mapState(["mealsList", "ordersList", "loadingData"]),
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

<style scoped>

</style>