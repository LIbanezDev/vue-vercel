<template>
    <div>

        <h4> Your order: </h4>
            <b-form @submit="addOrder">
                <b-row>
                    <b-col cols="6">
                        <b-form-group label="ID" label-for="mealId">
                            <b-form-input id="mealId" v-model="mealSelected._id" required disabled>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group label="Meal name" label-for="mealName">
                            <b-form-input id="mealName" v-model="mealSelected.name" required disabled>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group :label="`Amount: ${form.amount}`" label-for="mealsAmount">
                            <b-form-input id="mealsAmount" v-model="form.amount" type="range" min="1" max="10">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group label="Date" label-for="mealsAmount">
                            <b-form-timepicker v-model="getDate" show-seconds locale="en" disabled></b-form-timepicker>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group class="mt-4">
                            <b-form-radio-group
                                    id="radio-group-1"
                                    v-model="form.selected"
                                    :options="form.options"
                                    name="radio-options"
                            ></b-form-radio-group>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group label="Total price" label-for="mealsAmount">
                            <b-form-input id="desc" v-model="totalPrice" required disabled>
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-button type="submit" variant="primary" squared class="mt-4 mb-4">Order Meal...</b-button>
                    </b-col>
                </b-row>
            </b-form>
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
    import axios from "axios";
    import { mapState, mapMutations } from 'vuex'

    export default {
        name: "AddOrderForm",
        props: ['mealSelected'],
        data(){
            return{
                alert:{
                    show:false,
                    variant:'',
                    text:''
                },
                form:{
                    amount:1,
                    date:'',
                    selected:'',
                    options:[
                        {text: 'To go', value:'1'},
                        {text: 'Delivery', value:'2'},
                    ]
                },
                date: new Date()
            }
        },
        methods: {
            ...mapMutations["setOrderList"],
            addOrder(evt) {
                evt.preventDefault()
                if(!this.mealSelected._id || (this.form.selected !== '1' && this.form.selected !== '2')){
                    this.alert.show = true
                    this.alert.text = 'Your order failed'
                    this.alert.variant = 'danger'
                    return
                }
                const orderToAdd = {
                    meal_id: this.mealSelected._id,
                    amount: this.form.amount
                }
                axios.post('https://serverless-tan-theta.vercel.app/api/orders', orderToAdd, {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                })
                    .then(orderAdded => {
                        this.ordersList.push(orderAdded.data)
                        this.alert.show = true
                        this.alert.text = 'Order successfully added'
                        this.alert.variant = 'success'
                    })
            },
        },
        computed:{
            ...mapState(["ordersList"]),
            totalPrice(){
                if(this.form.selected === '2') this.mealSelected.price += 1000
                return this.mealSelected.price
            },
            getDate(){
                return `${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`
            }
        }
    }
</script>