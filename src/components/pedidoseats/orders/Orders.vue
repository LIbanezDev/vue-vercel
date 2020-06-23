<template>
    <div>
        <b-row>
            <b-col class="text-center" cols="12"><h2> Orders </h2></b-col>
            <b-col class="text-center" cols="12"><h6> I love Vue js </h6></b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-table
                      id="orders"
                      :items="ordersList"
                      :per-page="perPage"
                      :current-page="currentPage"
                      :busy="loadingData"
                      class="mt-5"
                      :fields="fieldsOrders"
                      outlined>
                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>Loading Orders...</strong>
                    </div>
                </template>
                </b-table>
            </b-col>
            <b-col>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="orders"
                  size="sm"
                  first-text="First"
                  prev-text="Prev"
                  next-text="Next"
                  last-text="Last"
                ></b-pagination>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import { mapState} from 'vuex';

    export default {
        name: "Orders",
        data(){
            return{
                fieldsOrders:['meal_id', 'user_name', 'amount'],
                perPage: 4,
                currentPage: 1,
            }
        },
        computed:{
            ...mapState(["loadingData","ordersList"]),
            rows() {
                return this.ordersList.length
            }
        }
    }
</script>
