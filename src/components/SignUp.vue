<template>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          color="primary"
          block
          depressed
          v-bind="attrs"
          v-on="on"
          width="300"
          class="signupbtn primary--text"
        >
          Not a member? Sign up now
        </v-btn>
      </template>
      <v-card class="rounded-xl">
        <v-toolbar flat >
          <v-spacer></v-spacer>
          <v-toolbar-title
          class="toolbar-font primary--text"
          >Register</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
          <div class="pa-13">
            <v-text-field
              v-model="email"
              outlined
              :error-messages="emailErrors"
              label="Email Address"
              class="signupbtn mt-2"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              class="signupbtn"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              :type="show2 ? 'text' : 'password'"
              outlined
              :rules="[rules.password, rules.length(6)]"
              required
            
            ></v-text-field>
            <v-text-field
              v-model="nickname"
              label="Username"
              class="signupbtn"
              required
              outlined
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-checkbox
              v-model="checkbox"
              :error-messages="checkboxErrors"
              class="signupbtn checkbox mt-n2"
              label="Creating an account means you're okay with our Terms of Service and Privacy Policy."
            ></v-checkbox>
            <v-row>
            <v-col>
            <v-btn
              block
              depressed
              color="primary"
              text
              @click="dialog = false"
            >
              CLOSE
            </v-btn></v-col>
            <v-col><v-btn
              block
              depressed
              color="primary"
              text
              @click="register"
            >
              CREATE ACCOUNT
            </v-btn></v-col></v-row></div>
      </v-card>
    </v-dialog>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
// import {mapState, mapActions} from "vuex"
  export default {
    mixins: [validationMixin],

    validations:{
      name: {required, maxLength: maxLength(10)},
      email: {required, email},
      checkbox: {
        checked (val) {
          return val
        },
      },
    },
    data: () => ({ 
      email: '',
      password: '',
      phone: '',
      nickname: '',
      dialog: false,
      checkbox: false,
      show2:false,
      rules:{
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])().+$/) ||
          'Password must contain an upper case letter and a lower case letter',
      },
    }),
    
    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
        },  
      checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
      },
      // ...mapState(["isLogin", "isLoginError"])
    },
    methods: {
      // ...mapActions(["login"]),
    },
  }
</script>

<style lang="scss" scoped>
  .toolbar-font{
    font-family: abril-fatface, serif;
    font-weight: 400;
    font-style: normal;
    font-size: 30px;
    margin-top: 70px;
  }

  .signupbtn{
    font-family: raleway, sans-serif;
    font-weight: 500;
    font-style: normal;
    text-transform: none;
    letter-spacing: 0.02em;
  }

  .v-btn{
  text-transform: none !important;
  font-family: raleway, sans-serif;
  font-weight: 600;
  font-style: normal;
  }
  .checkbox{
    font-size:12px;
  }
</style>