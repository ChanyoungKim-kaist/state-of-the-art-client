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
        <audio  id="audioval" 
          src="https://storage.cloudconvert.com/tasks/7dd9cba2-aed0-46ad-b7ff-1d217b141dbc/Bubble-Jump_AdobeStock_331813116_preview.mp3?AWSAccessKeyId=cloudconvert-production&Expires=1626907093&Signature=nnG43SqMxeV%2BcRQVu4zdpglirAY%3D&response-content-disposition=inline%3B%20filename%3D%22Bubble-Jump_AdobeStock_331813116_preview.mp3%22&response-content-type=audio%2Fmpeg"
        autoplay loop></audio>
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
              :class="isFilter"
            ></v-img>
            <v-img
              v-else
              width="180"
              src="./assets/main_2.svg"
              contain
              :class="isFilter"
            ></v-img>
          </v-hover>
          </v-col>
          
          <v-col align="end">
            <v-tooltip bottom content-class="tooltipfont mucolor" transition="scroll-y-transition">
              <template v-slot:activator="{on, attrs}">
                <v-hover v-slot="{hover}">
                <v-btn  v-if="hover" router :to="{name: 'products'}" v-bind="attrs" v-on="on" fab class="mucolor white--text" elevation="3">
                  <span>
                    <i class="fas fa-palette rotate"></i>
                  </span>
                </v-btn>
                <v-btn  v-else router :to="{name: 'products'}" v-bind="attrs" v-on="on" fab class="white mucolor--text" elevation="3">
                  <span>
                    <i class="fas fa-palette"></i>
                  </span>
                </v-btn>
                </v-hover>
            </template>
            <span> museum </span>
            </v-tooltip>

            <v-tooltip bottom content-class="tooltipfont aucolor" transition="scroll-y-transition">
              <template v-slot:activator="{on, attrs}">
                <v-hover v-slot="{hover}">
                <v-btn  v-if="hover" router :to="{name: 'live'}" v-bind="attrs" v-on="on" fab class="aucolor white--text" elevation="3">
                  <span>
                    <i class="fas fa-gavel rotate"></i>
                  </span>
                </v-btn>
                <v-btn  v-else router :to="{name: 'live'}" v-bind="attrs" v-on="on" fab class="white aucolor--text" elevation="3">
                  <span>
                    <i class="fas fa-gavel"></i>
                  </span>
                </v-btn>
                </v-hover>
            </template>
            <span> auction </span>
            </v-tooltip>

            <v-tooltip bottom content-class="tooltipfont gamecolor" transition="scroll-y-transition">
              <template v-slot:activator="{on, attrs}">
                <v-hover v-slot="{hover}">
                <v-btn  v-if="hover" router :to="{name: 'game'}" v-bind="attrs" v-on="on" fab class="gamecolor white--text" elevation="3">
                  <span>
                    <i class="fas fa-puzzle-piece rotate"></i>
                  </span>
                </v-btn>
                <v-btn  v-else router :to="{name: 'game'}" v-bind="attrs" v-on="on" fab class="white gamecolor--text" elevation="3">
                  <span>
                    <i class="fas fa-puzzle-piece"></i>
                  </span>
                </v-btn>
                </v-hover>
            </template>
            <span> game </span>
            </v-tooltip>

            <v-tooltip bottom content-class="tooltipfont transparent" transition="scroll-y-transition">
              <template v-slot:activator="{on, attrs}">
                <v-hover v-slot="{hover}">
                <v-btn  v-if="hover" @click.stop="drawer=!drawer" v-bind="attrs" v-on="on" fab class="primary white--text" elevation="3">
                  <span>
                    <i class="fas fa-bars rotate"></i>
                  </span>
                </v-btn>
                <v-btn  v-else router :to="{name: 'game'}" v-bind="attrs" v-on="on" fab class="white primary--text" elevation="3">
                  <span>
                    <i class="fas fa-bars"></i>
                  </span>
                </v-btn>
                </v-hover>
              </template>
            <span></span>
            </v-tooltip>
            <!-- <v-btn text @click="logout">
              <span class="mr-2 fa-stack fa-1x">
                <i class="fas fa-puzzle-piece"></i>
              </span>
              logout </v-btn>
            <v-btn text router :to="{name: 'mypage'}">
              <span class="mr-2 fa-stack fa-1x">
                <i class="fas fa-puzzle-piece"></i>
              </span>
              mypage
            </v-btn>
            <v-btn text router :to="{name: 'artinfo'}">
              <span class="mr-2 fa-stack fa-1x">
                <i class="fas fa-puzzle-piece"></i>
              </span>
              Artinfo
            </v-btn> -->
          </v-col>
        </v-row>  
      </v-container>
    </v-app-bar>
    <v-main>
      <routerView/>
    </v-main>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      :width="300"
    >
      <v-list>
        <v-list-item>
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
        </v-list-item>
        <v-list-item>
          <v-hover>
            <v-img
              transition="scale-transition"
              slot-scope="{hover}"
              v-if="hover"
              src="./assets/main_2.svg"
              contain
              class="title"
            ></v-img>
            <v-img
              v-else
              src="./assets/main_1.svg"
              contain
              class="title"
            ></v-img>
          </v-hover>
        </v-list-item>
        <v-list-item>
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
        </v-list-item>
        <v-list-item></v-list-item>
        
        <v-list-item link router :to="{name: 'mypage'}">
          <v-list-item-content>
            <v-list-item-title class="fontbtn">My page</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link router :to="{name: 'artinfo'}">
          <v-list-item-content>
            <v-list-item-title class="fontbtn">Art info</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="logout">
          <v-list-item-content>
            <v-list-item-title class="fontbtn">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
    drawer: null,
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard' },
      { title: 'About', icon: 'mdi-forum' },
    ],
  }),
  computed:{
    ...mapState(["isLogin"]),
    isFilter(){
      if (this.$route.name=='mypage'){
        return "title"
      }
      else{
        return ""
      }
    }
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
* {
   cursor: url(./assets/mouse-pointer-solid.png), grab;

}

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
.rotate{
    transform: rotate(360deg);
    transition: all 0.3s ease-in-out;
}
.tooltipfont{
  font-family: raleway, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  text-transform: uppercase !important;
  letter-spacing: -.008em;
  color: #ffffff;
  
}
</style>


