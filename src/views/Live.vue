<template>
<v-app fill-height>
    <v-main class="cyan darken-3 pt-10" >
      <v-container v-if="isNow" >
        <v-layout row>
          <v-flex xs12 text-center class="title ">

                <v-text class="artwork_title">Cleopatra Testing Poisons on Those Condemned to Death</v-text>
                <!-- <v-text class="artwork_title">{{ArtInfo.engTitle}}</v-text> -->
            </v-flex>
          <v-col
            cols="12"
            sm="3"
          >
            <v-sheet
              rounded="xl"
              height="400"
              style="overflow: auto"
            >
              <v-list  v-for="(user, i) in currentUsers" two-line
                :key="i">
                <v-list-item>
                    <v-list-item-avatar>
                    <v-img v-bind:src="user.avatar" ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title class="userfont">{{user.name}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
            </v-sheet>
            
            <v-row justify="center">
                <v-dialog
                v-model="dialog"
                transition="dialog-bottom-transition"
                width="400"
                >
               
                <template v-slot:activator="{ on, attrs }">
                    <v-hover v-slot="{hover}">
                        <v-btn
                        v-if="hover"
                        class="mt-9 joinbtn"
                        width="170"
                        height="60"
                        rounded
                        color="yellow black--text"
                        raised
                        :ripple="false"
                        :disabled="isIn"
                        v-bind="attrs"
                        v-on="on"
                        >
                        <i class="fas fa-sign-in-alt mr-3 rotate"></i>
                        <v-text class="mr-1">Join</v-text>
                        </v-btn>
                        <v-btn
                        v-else
                        :ripple="false"
                        class="mt-9 joinbtn"
                        width="170"
                        height="60"
                        rounded
                        color="white secondary--text"
                        raised
                        :disabled="isIn"
                        v-bind="attrs"
                        v-on="on"
                        >
                        <i class="fas fa-sign-in-alt mr-3"></i>
                        <v-text class="mr-1">Join</v-text>
                        </v-btn>
                    </v-hover>
                </template>
                <v-card class="rounded-xl" width="500">
                    <v-card-title class="cardtitle">
                    경매에 참여하시겠습니까?
                    </v-card-title>
                    <v-card-text class="cardtext"> 
                        경매에 참여하기를 원하신다면, 확인을 눌러주세요.
                        경매 참여 시 사용자의 정보가 화면에 보여집니다.
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        text
                        @click="dialog = false"
                    >
                        취소
                    </v-btn>
                    <v-btn
                        color="secondary"
                        text
                        @click="enterAuction"
                    >
                        확인
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-sheet
              row wrap
              class="transparent"
            >
            <!-- <v-carousel :show-arrows="false" height="auto">
                <v-carousel-item
                v-for="(item,i) in ArtInfo.pictures"
                :key="i+'A'"
                :src="item.src"
                ></v-carousel-item>
            </v-carousel> -->

            <v-card elevation="9" tile class="mb-7">
                <v-img
                src="../assets/cleopatra.jpg">
                </v-img>
            </v-card>

            <v-card elevation="7" class="pa-10 mb-12">
                <!-- <v-card-title class="justify-center exp_title ">사형수들에게 독약을 시험하는 클레오파트라</v-card-title>
                <v-card-subtitle class="exp_subtitle text-center">알렉상드르 카바넬, 1887</v-card-subtitle>
                <v-card-text class="exp_text text-center">Cleopatra Testing Poisons on Condemned Prisoners (Cléopâtre essayant des poisons sur des condamnés à mort) is an 1887 painting by the French artist Alexandre Cabanel. It is now in the Royal Museum of Fine Arts, Antwerp. It shows Cleopatra VII sitting at a banquet observing the effects of poisons on prisoners condemned to death. Cabanel had always had a taste for historical and orientalist themes and when the painting was first seen by the Parisian public he was feted by the critics and showered with honours. Several international collectors attempted to buy the painting.</v-card-text> -->
                <v-card-title class="justify-center exp_title "> {{ArtInfo.title}}  </v-card-title>
                <v-card-subtitle class="exp_subtitle text-center">{{ArtInfo.subtitle}}</v-card-subtitle>
                <v-card-text class="exp_text text-center">{{ArtInfo.content}}</v-card-text>
            
            </v-card>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >

          <v-flex v-if="!change" xs12 text-center class="title">
            <p class="firstprice mb-8"> {{ ArtInfo.currentprice }} NB  </p>
            <v-text-field
                reverse
                v-if="isIn"
                append-icon="fas fa-coins mr-2"
                label="Bid Now!"
                type="number"
                filled
                solo
                color="cyan darken-3"
                v-model="newprice"
                class="mybid "
            >
            </v-text-field>
            <v-hover v-slot="{hover}">
                <v-btn 
                v-if="hover"
                :disabled="newprice <= ArtInfo.currentprice"
                elevation="2"
                fab
                height="100px"
                width="100px"
                
                class="hand2"
                color="yellow"
                :ripple="false"
                @click="high">
                <v-text class="icon">
                    👋🏻
                </v-text>
                </v-btn>
                <v-btn 
                v-else
                :disabled="newprice <= ArtInfo.currentprice"
                elevation="2"
                fab
                height="100px"
                width="100px"
                color="white"
                class="hand"
                :ripple="false"
                @click="high">
                <v-text class="icon">
                    👋🏻
                </v-text>
                </v-btn>
            </v-hover>    

        <div class="firstprice mt-4">
            {{countDown}}
        </div>
        </v-flex>

        <v-flex v-else xs12 text-center class="title">
            <p class="firstprice mb-8"> {{ ArtInfo.currentprice }} NB  </p>
            <v-text-field 
                reverse
                v-if="isIn"
                append-icon="fas fa-coins mr-2"
                label="Bid Now!"
                type="number"
                filled
                solo
                color="cyan darken-3"
                v-model="newprice"
                class="mybid "
            >
            </v-text-field>
            
            <v-hover v-slot="{hover}">
                <v-btn 
                v-if="hover"
                :disabled="newprice <= currentprice"
                elevation="2"
                fab
                height="100px"
                width="100px"
                
                class="hand2"
                color="yellow"
                :ripple="false"
                @click="high">
                <v-text class="icon">
                    👋🏻
                </v-text>
                </v-btn>
                <v-btn 
                v-else
                :disabled="newprice <= currentprice"
                elevation="2"
                fab
                height="100px"
                width="100px"
                color="white"
                class="hand"
                :ripple="false"
                @click="high">
                <v-text class="icon">
                    👋🏻
                </v-text>
                </v-btn>
            </v-hover>    

        <div class="firstprice mt-4">
            {{countDown}}
        </div>
        </v-flex>
        <v-timeline dense class="mt-4" >
                <v-slide-x-transition
                    group
                >
                    <v-timeline-item 
                    v-for="(event, i) in timeline"
                    :key="i+'B'"
                    class="mr-4 mb-4 userfont white--text"
                    color="cyan darken-4"
                    fill-dot
                    small
                    >
                    <v-row justify="space-between">
                        <v-col
                        cols="7"
                        >{{event.username}}</v-col>
                        <v-col
                        class="text-right userfont white--text"
                        cols="5"
                        >{{event.price}}</v-col>
                    </v-row>
                    </v-timeline-item>
                </v-slide-x-transition>
        </v-timeline>
        
          </v-col>
        </v-layout>
      </v-container>

      <v-container v-else>
          <v-layout justify-center align-center style="height: 700px">
          <v-flex xs12 text-center class="title">
                <h1> 지금은 경매 시작 전입니다! 🔔 </h1>
                <p> 가장 빠른 경매 시작 시간은 {{fastTime}} 입니다. </p>
            </v-flex>
            </v-layout>
      </v-container>
<v-footer
    padless
    fixed
    width="0"
  >
    <v-card
      flat tile class="ma-10"
    >
        <v-btn @click="Play" fab class=" primary--text" elevation="3">
            <span><i :class="isMarker"></i></span>
        </v-btn>
        <audio  id="audioval" src="https://storage.cloudconvert.com/tasks/1a5c33d0-b30e-4906-bae1-69f4a89268c1/live1.mp3?AWSAccessKeyId=cloudconvert-production&Expires=1626885909&Signature=jNcuobZVs5nPkp%2FDLQqsfFcuYDU%3D&response-content-disposition=inline%3B%20filename%3D%22live1.mp3%22&response-content-type=audio%2Fmpeg"
        autoplay loop></audio>
    </v-card>
</v-footer>
    </v-main>
</v-app>    
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"
const connection = new WebSocket('ws://192.249.18.172:443')



export default {
    mounted() {
        this.checkNow()
        this.checkisIn()
        this.checkTime()
    },
    data() {
        return {
            isIn : false,
            change : false,
            currentUsers: [],
            newprice: '',
            timerCount: 15,
            timerCount2: 59,
            countDown : 15,
            timeline: [{username: 'nayeon', price:100}, {username: 'nayeon', price:100}, {username: 'nayeon', price:100}],
            fasttime: '3:30',
            dialog: false,
            currentprice: 0,
            token: null,
            config: null,
            isNow: true,
            ArtInfo: null,
            fastTime: '0:0',
            marker: true
        }
    },
    methods: {
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
        checkisIn() {
            this.isIn = localStorage.getItem("BidIn")
        },
        checkNow() {
            axios.get("http://192.249.18.172:80/start_bidding/productid/10")
                .then(res2 => {
                if (res2.data.ok) {
                    this.isNow = true
                    let ArtInfo = {
                        currentprice : res2.data.data.currentprice,
                        engTitle : res2.data.data.engTitle,
                        title : res2.data.data.title,
                        subtitle : res2.data.data.subtitle,
                        context : res2.data.data.context,
                        pictures : res2.data.data.pictures
                    }
                    this.currentUsers = res2.data.data.currentUsers
                    this.ArtInfo = ArtInfo
                    this.token = localStorage.getItem("access_token")
                    this.config = {
                            headers: {
                                "token": this.token
                            }
                    },
                    console.log(this.token)
                } else {
                    this.fastTime = res2.data.fasttime
                }
                })
                .catch(() => {
                    alert('live 실패')
                });
        },
        high(){ // 새로운 입찰가 
            this.currentprice = this.newprice
            
            connection.send(JSON.stringify({
                "price": this.newprice,
                "user": this.userInfo.username
            }))
            this.newprice = null
        },

        enterAuction() { //경매에 참여하기
            this.dialog = false
            axios.get("http://192.249.18.172:80/start_bidding/productid/10/participate", this.config)
            .then(res3=>{ 
                this.currentUsers = res3.data.currentUsers
                localStorage.setItem("BidIn", true)
                this.checkisIn()
            })
            .catch(()=>{ alert('경매 참여에 실패했습니다.') })
        },
        // countDownTimer() {
        //     this.connection.onmessage = function(Event){
        //         console.log(Event)
        //     }
        //     if(this.countDown > 0) {
        //         setTimeout(()=> {
        //             this.countDown -= 1
        //             this.countDownTimer()
        //         }, 1000)
        //     } else {
        //         alert( '경매가 종료되었습니다.')

        //     }
        // }
        checkTime() {
            connection.onopen = function(Event){
                console.log(Event)
                console.log("Successfully connected to the auction")
            }

            connection.onmessage = function(Event){
                // let parsed = JSON.parse(data);
                // console.log(Event)
                // this.timeline = Event.data.content.previousBids  
                this.timeline= JSON.parse(Event.data).content.previousBids
                this.timePassed = JSON.parse(Event.data).content.timePassed
                this.countDown = 15 - this.timePassed
                console.log(this.timeline, this.timePassed, this.countDown)
                
            }
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

}

</script>

<style scoped>
* {
   cursor: url(../assets/c4.png), grab;

}

@font-face {
    font-family: "AmalfiCoast";
    src: local("AmalfiCoast"), url(../assets/fonts/AmalfiCoast.ttf) format("truetype");
}
@font-face {
    font-family: "116watermelon";
    src: local("116watermelon"), url(../assets/fonts/116watermelon.ttf) format("truetype");
}

.hand{
    animation:rotate infinite ;
    animation-duration: 4s;

}

@keyframes rotate {
  0% {transform: rotate(0deg); }
  2% {transform: rotate(10deg);}
  4% {transform: rotate(0deg);}
  6% {transform: rotate(-10deg);}
  8% {transform: rotate(0deg);}
  10% {transform: rotate(10deg);}
  12% {transform: rotate(0deg);}
  14% {transform: rotate(-10deg);}
  16% {transform: rotate(0deg);}
  100% {transform: rotate(0deg);}


  
}

.hand2{
    animation:rotate2 infinite ;
    animation-duration: 0.4s;

}

@keyframes rotate2 {
  0% {transform: rotate(0deg); }
  25% {transform: rotate(10deg);}
  50% {transform: rotate(0deg);}
  75% {transform: rotate(-10deg);}
  100% {transform: rotate(0deg);}



  
}


.firstprice{
    font-family: abril-fatface, noto-sans-cjk-kr;
    font-weight: 400;
    font-style: normal;
    font-size: 30px;
    color:rgb(255, 237, 72);
    text-shadow: rgba(0, 0, 0, 0.637) 0px 0px 8px;
}
.mybid{
    font-family: abril-fatface, noto-sans-cjk-kr;
    font-weight: 400;
    font-style: normal;
    font-size: 30px;
}

.exp_title{
font-family: noto-sans-cjk-kr, sans-serif;
font-weight: 900;
font-style: normal;
font-size:28px;
word-break: keep-all;
text-align: center;
letter-spacing: -0.6px;
margin-bottom: 14px;
}
.exp_subtitle{
font-family: noto-sans-cjk-kr, sans-serif;
font-weight: 500;
font-style: normal;
letter-spacing: -0.1px;
font-size:16px;
}
.exp_text{
    font-family: raleway, sans-serif;
    font-weight: 400;
    font-style: normal;
    color: black;
    font-size:16px;
    
}

.icon {
    font-size: 70px;
}

.artwork_title{
    font-family: AmalfiCoast;
    font-size: 50px;
    color: rgba(245, 245, 245, 0.336);
}

.userfont{
    font-family: raleway, sans-serif;
    font-weight: 400;
    font-size: 20px;
    font-style: normal;
}

.joinbtn{
    font-family: raleway, sans-serif;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: -0.1px;
    font-style: normal;
}
.rotate{
    transform: rotate(360deg);
    transition: all 0.3s ease-in-out;
    
   
}

.cardtitle{
    font-family: source-han-sans-korean, sans-serif;
    font-weight: 900;
    font-style: normal;
    letter-spacing: -0.3px;
}
.cardtext{
    font-family: source-han-sans-korean, sans-serif;
    font-weight: 300;
    font-style: normal;
    letter-spacing: -0.3px;
    /* line-height: 150%; */
}

.v-btn::before {
  background-color: transparent;
}

</style>