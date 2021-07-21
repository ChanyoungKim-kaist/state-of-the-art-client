<template>
<v-app fill height >
    <v-content >
        <v-container fluid class="fill-height bg">
            <v-row fill-height>
                <v-col cols="12" sm="6" class="bg">
                    <v-flex>
                    <v-layout align-center justify-center column pa-5 mt-10>
                        <v-avatar height="200" width="200" class="ma-10">
                            <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg"> -->
                            <v-img v-bind:src="userInfo.avatar" ></v-img>
                        </v-avatar>
                        <v-flex text-center>
                            <v-text class="money primary--text">Have a nice day,</v-text>
                            <v-text class="money">{{userInfo.username}}</v-text>
                            <p></p>
                            <v-text class="money primary--text"> You've got  </v-text>
                            <v-text class="money"> {{userInfo.money}} </v-text>
                            <v-text class="money primary--text"> NB </v-text>
                        </v-flex>
                    </v-layout>
                    </v-flex>

                </v-col>

                <v-col cols="12" sm="6" class="bg">
                    <v-flex >
                    <v-layout column pl-5 pr-5>
                        <v-flex >
                            <v-text class="gallery primary--text">My Collection</v-text>
                            <v-carousel
                                cycle
                                height="auto"
                                hide-delimiters
                                show-arrows-on-hover
                            >
                                <v-carousel-item 
                                v-for="(slide, i) in collection"
                                :key="i"
                                :src="slide.src"
                                >
                                </v-carousel-item>
                            </v-carousel>
                        </v-flex>   
                            
                            <v-flex>
                                <v-text class="gallery primary--text"> Wish List </v-text>
                            <v-carousel
                                cycle
                                height="auto"
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
                        
                    </v-layout></v-flex></v-col>
            </v-row>

        <v-footer
    padless
    fixed
    width="0">
    <v-card
      flat tile class="ma-10"
    >
        <v-btn @click="Play" fab class=" primary--text" elevation="3">
            <span><i :class="isMarker"></i></span>
        </v-btn>
        <audio  id="audioval" src="../assets/bgm/mypage.mp3"
        autoplay loop></audio>
    </v-card>
</v-footer>
</v-container>
</v-content>
</v-app>    
</template>

<script>
import {mapState} from "vuex"
export default {
    mounted(){
        this.getCollection()
        this.getWish()
    },
    data(){
        return {
            collection: [  
                
            ],
            wishlist: [
                
            ],
            avatar: null,
            marker: true,
        }
    },
    computed: {
        ...mapState(["userInfo"]),
      isMarker(){
            if (this.marker) {
                return 'fas fa-volume-up'
            }
            else {
                return 'fas fa-volume-mute'
            }
        },
    },
    methods: {
        getWish() {
            for (var i=0; i<this.userInfo.wish.length; i++) {
                var good = this.userInfo.wish[i].imagename
                if(good ==0)
                    this.wishlist.push({src: require("../assets/pictures/pictures0.jpeg")})
                else if(good ==1)
                    this.wishlist.push({src: require("../assets/pictures/pictures1.jpeg")})
                else if(good ==2)
                    this.wishlist.push({src: require("../assets/pictures/pictures2.jpeg")})
                else if(good ==3)
                    this.wishlist.push({src: require("../assets/pictures/pictures3.jpeg")})
                else if(good ==4)
                    this.wishlist.push({src: require("../assets/pictures/pictures4.jpeg")})
                else if(good ==5)
                    this.wishlist.push({src: require("../assets/pictures/pictures5.jpeg")})
                else if(good ==6)
                    this.wishlist.push({src: require("../assets/pictures/pictures6.jpeg")})
                else if(good ==7)
                    this.wishlist.push({src: require("../assets/pictures/pictures7.jpeg")})
                else if(good ==8)
                    this.wishlist.push({src: require("../assets/pictures/pictures8.jpeg")})
                else if(good ==9)
                    this.wishlist.push({src: require("../assets/pictures/pictures9.jpeg")})
                else if(good ==10)
                    this.wishlist.push({src: require("../assets/pictures/pictures10.jpeg")})
            }
        },
        getCollection() {
            for (var k=0; k<this.userInfo.MyArt.length; k++) {
                var temp = this.userInfo.MyArt[k].imagename
                if(temp==0)
                    this.collection.push({src: require("../assets/pictures/pictures0.jpeg")})
                else if(temp ==1)
                    this.collection.push({src: require("../assets/pictures/pictures1.jpeg")})
                else if(temp ==2)
                    this.collection.push({src: require("../assets/pictures/pictures2.jpeg")})
                else if(temp ==3)
                    this.collection.push({src: require("../assets/pictures/pictures3.jpeg")})
                else if(temp ==4)
                    this.collection.push({src: require("../assets/pictures/pictures4.jpeg")})
                else if(temp ==5)
                    this.collection.push({src: require("../assets/pictures/pictures5.jpeg")})
                else if(temp ==6)
                    this.collection.push({src: require("../assets/pictures/pictures6.jpeg")})
                else if(temp ==7)
                    this.collection.push({src: require("../assets/pictures/pictures7.jpeg")})
                else if(temp ==8)
                    this.collection.push({src: require("../assets/pictures/pictures8.jpeg")})
                else if(temp ==9)
                    this.collection.push({src: require("../assets/pictures/pictures9.jpeg")})
                else if(temp ==10)
                    this.collection.push({src: require("../assets/pictures/pictures10.jpeg")})
            }
        },
        Play()
        {
            var myAudio = document.getElementById("audioval");
            this.marker = !this.marker;
            if(myAudio.paused) {
                myAudio.play();
            }
            else {
            myAudio.pause();
            }
        },
    }
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
}



.bg {
    background-color: rgb(248, 248, 248);
}
</style>