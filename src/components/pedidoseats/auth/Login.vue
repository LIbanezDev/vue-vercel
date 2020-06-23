<template>
    <div>
        <b-row class="d-flex justify-content-center">
            <b-col cols="6">
                <b-overlay :show="loadingLogin" rounded="sm">
                    <b-form @submit="login">
                        <b-form-group
                            label="Email address:"
                            label-for="input-1"
                            description="We'll never share your email with anyone else."
                        >
                            <b-form-input
                              id="input-1"
                              v-model="form.email"
                              type="email"
                              required
                              placeholder="Enter email"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label="Password:"
                            label-for="password-input"
                        >
                            <b-form-input
                              id="password-input"
                              v-model="form.password"
                              type="password"
                              required
                              placeholder="Enter Password"
                              autocomplete="on"
                            ></b-form-input>
                            <b-button type="submit" variant="primary" class="mt-4">Submit</b-button>
                            <b-alert
                              variant="danger"
                              dismissible
                              fade
                              :show="wrongUserOrEmail"
                              @dismissed="wrongUserOrEmail=false"
                              class="mt-4"
                            >
                              {{ wrongAlertContent }}
                            </b-alert>
                        </b-form-group>
                    </b-form>
                </b-overlay>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapMutations} from 'vuex'
    export default {
        name: "login",
        data(){
            return{
                form:{
                    email:'',
                    password:''
                },
                loadingLogin: false,
                wrongUserOrEmail: false,
                wrongAlertContent: ''
            }
        },
        methods:{
            ...mapMutations(["changeUserState"]),
            login(evt){
                this.loadingLogin = true
                evt.preventDefault()
                axios.post('https://serverless-tan-theta.vercel.app/api/auth/login', this.form)
                .then(res => {
                    this.loadingLogin = false
                    if(res.data.token) {
                        this.changeUserState(true)
                        const userToken = res.data.token
                        localStorage.setItem('token', userToken)
                        this.getUserData()
                    }else{
                        this.wrongUserOrEmail = true
                        this.wrongAlertContent = res.data
                    }
                })
            },
            getUserData(){
                axios.get('https://serverless-tan-theta.vercel.app/api/auth/me', {
                    headers: {
                        Authorization:localStorage.getItem('token')
                    }
                })
                .then(userData => {
                    const { name, email } = userData.data
                    localStorage.setItem('userData', JSON.stringify({name, email}))
                })
            }
        },
    }
</script>

<style scoped>

</style>