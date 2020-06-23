<template>
    <div>
          <h2 class="text-center"> Orders </h2>
          <b-table :items="ordersList" :busy="loadingData" class="mt-5" :fields="fieldsOrders" outlined>
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading Orders...</strong>
            </div>
            </template>
          </b-table>
    </div>
</template>

<script>
    import { mapState} from 'vuex';
    export default {
        name: "Orders",
        data(){
            return{
                fieldsOrders:['meal_id', 'user_id', 'amount'],
            }
        },
        methods:{
            addOrder(evt){
                evt.preventDefault()
                fetch('https://serverless-aq52i3rgo.vercel.app/api/orders', {
                  method: 'POST', // or 'PUT'
                  body: JSON.stringify(), // data can be `string` or {object}!
                  headers:{
                    'Content-Type': 'application/json'
                  },
                }).then(res => res.json())
                  .then(orderAdded => {
                    this.ordersList.push(orderAdded)
                  })
            },
        },
        computed:{
            ...mapState(["loadingData","ordersList"])
        }
    }
</script>

<style scoped>

</style>