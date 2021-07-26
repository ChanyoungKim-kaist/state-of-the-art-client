<template> <v-app>
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
          src="../assets/main_1.svg"
          contain
          class="title"
        ></v-img>
        <v-img
          v-else
          src="../assets/main_2.svg"
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
</template>

<script>
import {mapState} from "vuex"
import Login from '../components/LogIn.vue'
//import Main from '../views/Main.vue'
export default {
  name: 'App',

  components: {
    Login,


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
    }
  }
};
</script>

<style scoped >

.background {
  background-color: rgb(236, 236, 236);

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
  color: #DB173F;
}

</style>
