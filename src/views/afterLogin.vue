<template>
  <v-app>
    <v-app-bar>
      <v-container fluid>
        <v-row class="align-center no-gutters mt-12 " justify="space-between">
          <v-col>
          <v-hover>
            <v-img
              transition="scale-transition"
              slot-scope="{hover}"
              v-if="hover"
              width="180"
              src="../assets/main_1.svg"
              contain
              class="title"
            ></v-img>
            <v-img
              v-else
              width="180"
              src="../assets/main_2.svg"
              contain
              class="title"
            ></v-img>
          </v-hover>
          </v-col>
          
          <v-col align="end">
            <v-btn text>
              <span class="mr-2 fa-stack fa-1x">
                <i class="fas fa-palette"></i>
              </span>
              Museum
            </v-btn>
            <v-btn text>
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

export default {
  components:{

  }
  
}
</script>
<style>
  .title {
    /* fill: firebrick; */
    filter: invert(67%) sepia(93%) saturate(5000%) hue-rotate(20deg) brightness(110%) contrast(135%);
  }
  .v-btn{
    margin-inline-start: 10px;
    margin-inline-end: 10px;
    font-family: raleway, sans-serif;
    font-weight: 500;
    font-style: normal;
  }
</style>