<template>
    <v-layout column>
        <v-flex >
            <v-layout row mt-10>
                <v-flex  text-xs-center row wrap align-center xs8>
                    <v-layout align-center justify-center column pa-5>
                        <v-item-avatar height="200" width="200" class="mb-10">
                            <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg"> -->
                            <v-img v-bind:src="userInfo.avatar" ></v-img>
                        </v-item-avatar>
                        <v-flex text-center pt-5>
                            <h1> {{userInfo.username}}</h1>
                            <p> {{userInfo.username}} </p>
                            <v-text class="money"> 10000 </v-text>
                            <v-text> NB </v-text>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex class="bg" xs4>
                    <v-layout column pa-5>
                        <v-flex pa-2 mt-15>
                            <v-text class="gallery"> My Gallery </v-text>
                            <v-carousel
                                cycle
                                height="220"
                                hide-delimiters
                                show-arrows-on-hover
                            >
                                <v-carousel-item 
                                v-for="(slide, i) in slides"
                                :key="i"
                                :src="slide.src"
                                >
                                </v-carousel-item>
                            </v-carousel>
                        </v-flex>   
                            
                            <v-flex pa-2 mt-15>
                                <v-text class="gallery"> Wish List </v-text>
                            <v-carousel
                                cycle
                                height="220"
                                hide-delimiters
                                show-arrows-on-hover
                            >
                                <v-carousel-item
                                v-for="(slide, i) in wishlist"
                                :key="i"
                                :src="slide.src"
                                >
                                </v-carousel-item>
                            </v-carousel>
                        </v-flex>  
                    </v-layout>
                </v-flex> 
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import {mapState} from "vuex"
export default {
    data(){
        return {
            slides: [  
                {src: require("../assets/pictures/pictures1.jpeg") },
                {src: require("../assets/pictures/pictures2.jpeg") },
                {src: require("../assets/pictures/pictures3.jpeg") },
                {src: require("../assets/pictures/pictures4.jpeg") },
                {src: require("../assets/pictures/pictures5.jpeg") },
                {src: require("../assets/pictures/pictures6.jpeg") },
            ],
            wishlist: [
                {src: require("../assets/pictures/pictures7.jpeg") },
                {src: require("../assets/pictures/pictures8.jpeg") },
                {src: require("../assets/pictures/pictures9.jpeg") },
                {src: require("../assets/pictures/pictures10.jpeg") },
            ],
            avatar: null
        }
    },
    computed: {
        ...mapState(["userInfo"])
    },
    // methods: {
    //     getAvatar() {
    //         this.avatar = "userInfo".avatar
    //     }
    // }
}
</script> 

<style>

.money{
  font-family: abril-fatface, serif;
  font-weight: 500;
  font-style: normal;
  font-size: 30px;
  margin-top: 70px;

}

.gallery {
  font-family: abril-fatface, serif;
  font-weight: 500;
  font-style: normal;
  font-size: 30px;
  margin-top: 70px;
  color: white

}

.title {
    padding-top: 30px;
    font-family: KakaoBig,Apple SD Gothic Neo,Malgun Gothic,맑은 고딕,sans-serif;
    font-size: 46px;
    line-height: 60px;
    color: var(--baseForeground);
    letter-spacing: -1px;
    background-size: 72px 72px;
}

.bg {
    background-color: black;
}
</style>