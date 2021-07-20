<template> 
<v-app v-if="!isLogin">
  <v-container  fill-height fluid class="background">
    <v-col align="center" justify="center" class="mb-10" >
      <v-row
      class="ma-16"
      style="background-size: cover;">
      <v-hover>
        <v-img
          transition="scale-transition"
          slot-scope="{hover}"
          v-if="hover"
          src="./assets/main_1.svg"
          contain
          class="title"
        ></v-img>
        <v-img
          v-else
          src="./assets/main_2.svg"
          contain
          class="title"
        ></v-img>
      </v-hover>
    </v-row>
    <v-row justify="center" align="center">
        <Login></Login></v-row>
    <v-row align="center" justify="center">    
        <v-btn
          class="fontbtn ml-10 mr-10" width="200 "
          text

        >
          미술관 둘러보기
        </v-btn>
    </v-row>  
    </v-col>
  </v-container>
</v-app>  
<v-app v-else >
  <v-app-bar app flat color="transparent" height="0" class="mt-5">
      <v-container fluid>
        <v-row class="align-center no-gutters mt-12 " justify="space-between">
          <v-col>
          <v-hover>
            <v-img
              transition="scale-transition"
              slot-scope="{hover}"
              v-if="hover"
              width="180"
              src="./assets/main_1.svg"
              contain
              
            ></v-img>
            <v-img
              v-else
              width="180"
              src="./assets/main_2.svg"
              contain
          
            ></v-img>
          </v-hover>
          </v-col>
          
          <v-col align="end">
            <v-btn text router :to="{name: 'products'}">
              <span class="mr-2 fa-stack fa-1x">
                <i class="fas fa-palette"></i>
              </span>
              Museum
            </v-btn>
            <v-btn text router :to="{name: 'live'}">
              <span class="mr-2 fa-stack fa-1x">
                <i class="fas fa-gavel"></i>
              </span>
              Auction
            </v-btn>
            <v-btn text router :to="{name: 'game'}">
              <span class="mr-2 fa-stack fa-1x">
                <i class="fas fa-puzzle-piece"></i>
              </span>
              game
            </v-btn>
            <v-btn text @click="logout">
              <span class="mr-2 fa-stack fa-1x">
                <i class="fas fa-puzzle-piece"></i>
              </span>
              logout
            </v-btn>
          </v-col>

          
        </v-row>  
      </v-container>
    </v-app-bar>
    <v-main>
      <routerView/>
    </v-main>
</v-app>
</template>

<script>
import {mapState, mapActions} from "vuex"
import Login from './components/LogIn.vue'
//import Main from '../views/Main.vue'
export default {
  name: 'App',

  components: {
    Login
  },

  data: () => ({
    dialog: false,
  }),
  computed:{
    ...mapState(["isLogin"])
  },
  methods: {
    openDialog(){
      this.dialog = true;
    },
    closeDialog(){
      this.dialog = false;
    },
    ...mapActions(["logout"])
  }
};
</script>

<style scoped >

.background {
  background-color: whitesmoke;

}
.title {
    /* fill: firebrick; */
    filter: invert(67%) sepia(93%) saturate(5000%) hue-rotate(20deg) brightness(110%) contrast(135%);
  }

.fontbtn {
  font-family: raleway, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  text-transform: none !important;
  letter-spacing: -.008em;
  color: #F73100;
}
  .v-btn{
    margin-inline-start: 10px;
    margin-inline-end: 10px;
    font-family: raleway, sans-serif;
    font-weight: 500;
    font-style: normal;
  }
</style>

</style>
