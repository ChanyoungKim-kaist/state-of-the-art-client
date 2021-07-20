<template>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-slot="{hover}">
          <transition name="fade" mode="in-out">
          <v-btn
          class="ma-2 primary white--text change-font"
          v-if="hover"
          width="100"
          height="100"
          outlined
          fab
          large
          v-ripple="false"
          v-bind="attrs"
          v-on="on"
          >
            ➔
          </v-btn>
          <v-btn
          class="ma-2 primary--text change-font"
          v-else
          width="100"
          height="100"
          outlined
          fab
          large
          v-ripple="false"
          v-bind="attrs"
          v-on="on"
          >
            --->
          </v-btn>
          </transition>
          
        </v-hover>
        
      </template>
      <v-card class="rounded-xl" >
        <v-toolbar flat >
          <v-spacer></v-spacer>
          <v-toolbar-title
            class="toolbar-font primary--text"
          >Sign in</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
          <div class="pa-13">
            <v-text-field
              class="mt-2"
              v-model="email"
              label="Email Address"
              required
              outlined
            ></v-text-field>
            <v-text-field
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              :type="show2 ? 'text' : 'password'"
              v-model="password"
              label="Password"
              required
              outlined
            ></v-text-field>
            <v-spacer></v-spacer>
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
              @click="login({email, password})"
            >
              LOGIN
            </v-btn>
            
            </v-col><Signup
            ></Signup></v-row></div>
      </v-card>
    </v-dialog>

</template>

<script>
import {mapState, mapActions} from "vuex"
import Signup from './SignUp.vue'
  export default {
    data: () => ({
      email: null,
      password: null,
      dialog: false,
      show2: false,
    }),
    computed: {
      ...mapState(["isLogin", "isLoginError"])
    },
    methods: {
      ...mapActions(["login"]),
    },
    components: {
      Signup
    }
  }
</script>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.v-btn{
  text-transform: none !important;
  font-family: raleway, sans-serif;
  font-weight: 600;
  font-style: normal;

}
.v-btn--outlined{
  border: 2px solid currentColor
}

.toolbar-font{
  font-family: abril-fatface, serif;
  font-weight: 500;
  font-style: normal;
  font-size: 30px;
  margin-top: 70px;

}
</style>