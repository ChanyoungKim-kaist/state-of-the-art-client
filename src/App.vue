<template>
   <v-app id="inspire">
    <v-app-bar
      app
      color="grey lighten-3"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar v-if="isLogin"
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn v-else router :to="{name: 'login'}"
          class="mr-10"
        > Login </v-btn>

        <v-btn
          router :to="{name: 'mypage'}"
          text
        > Mypage </v-btn>

        <v-btn
          @click="$router.push({path: '/'})"
          text
        >
          Test
        </v-btn>

        <v-btn
          text
        >
          Products
        </v-btn>
        <v-btn
          text
          router :to="{name: 'live'}"
        >
          Live
        </v-btn>
        <v-btn
          text
          router :to="{name: 'upload'}"
        >
          Upload
        </v-btn>
        <v-btn
          text
          @click="$store.dispatch('logout')"
        >
          Logout
        </v-btn>

        <v-spacer></v-spacer>

      </v-container>
    </v-app-bar>

    <v-main>
        <routerView/>
      </v-main>
  </v-app>
</template>

<script>
import {mapState} from "vuex"
  export default {
    data: () => ({ drawer: null}),
    computed: {
      ...mapState(["isLogin"])
    },
  }
</script>
