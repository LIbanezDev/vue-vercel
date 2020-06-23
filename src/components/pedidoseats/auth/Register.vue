<template>
    <div>
        <b-row class="d-flex justify-content-center">
            <b-col cols="6">
                <b-overlay :show="loadingRegister" rounded="sm">
                    <b-form @submit="register">
                        <b-form-group
                            label="Your Name:"
                            label-for="name-input"
                        >
                            <b-form-input
                              id="name-input"
                              v-model="form.name"
                              type="text"
                              minlength="5"
                              required
                              placeholder="Enter your name"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            label="Email address:"
                            label-for="email-input"
                            description="We'll never share your email with anyone else."
                        >
                            <b-form-input
                              id="email-input"
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
                              :variant="alertVariant"
                              dismissible
                              fade
                              :show="showAlertRegister"
                              @dismissed="showAlertRegister=false"
                              class="mt-4"
                            >
                              {{ alertContent }}
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
    export default {
        name: "register",
        data(){
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                },
                loadingRegister: false,
                showAlertRegister: false,
                alertVariant: '',
                alertContent: ''
            }
        },
        methods:{
            register(evt){
                evt.preventDefault()
                this.loadingRegister = true
                if(this.form.name.length < 5 || this.form.email.length < 5 || this.form.password.length < 5){
                    this.showAlertRegister = true
                    this.alertVariant = 'danger'
                    this.alertContent = 'Could not create user, be sure to enter data correctly'
                    this.loadingRegister = false
                    return
                }
                axios.post('https://serverless-tan-theta.vercel.app/api/auth/register', this.form)
                    .then(res => {
                        if(res.status === 201){
                            this.showAlertRegister = true
                            this.alertVariant = 'success'
                            this.alertContent = 'Successfully registered'
                        }else{
                            this.showAlertRegister = true
                            this.alertVariant = 'danger'
                            this.alertContent = 'Email has already been taken'
                        }
                        this.loadingRegister = false
                    })
            }
        },
    }
</script>

<style scoped>

</style>