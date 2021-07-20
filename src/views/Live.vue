<template>
    <v-main class="grey lighten-2">
      <v-container v-if="isNow">
        <v-layout row>
          <v-flex xs12 text-center class="title">
                <h1> {{ArtInfo.title}} </h1>
                <p> {{ArtInfo.context}}</p>
            </v-flex>
          <v-col
            cols="12"
            sm="3"
          >
            <v-sheet
              rounded="lg"
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
                    <v-list-item-title>{{user.name}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
            </v-sheet>
            
            <v-row justify="center">
                <v-dialog
                v-model="dialog"
                persistent
                max-width="290"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    fab
                    :disabled="isIn"
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon> mdi-plus </v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="text-w7">
                    경매에 참여하시겠습니까?
                    </v-card-title>
                    <v-card-text> 
                        경매에 참여하기를 원하신다면, 확인을 눌러주세요. 
                        경매 참여 시 사용자의 정보가 화면에 보여집니다.
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                    >
                        취소
                    </v-btn>
                    <v-btn
                        color="green darken-1"
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
              rounded="lg"
              row wrap
            >
            <v-carousel :show-arrows="false" height="auto">
                <v-carousel-item
                v-for="(item,i) in ArtInfo.pictures"
                :key="i+'A'"
                :src="item.src"
                ></v-carousel-item>
            </v-carousel>

            <v-timeline dense clipped >
                <v-slide-x-transition
                    group
                >
                    <v-timeline-item 
                    v-for="(event, i) in timeline"
                    :key="i+'B'"
                    class="mr-4 mb-4"
                    color="pink"
                    small
                    >
                    <v-row justify="space-between">
                        <v-col
                        cols="7"
                        v-text="event.username" 
                        ></v-col>
                        
                        <v-col
                        class="text-right"
                        cols="5"
                        v-text="event.price"
                        ></v-col>
                    </v-row>
                    </v-timeline-item>
                </v-slide-x-transition>
            </v-timeline>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >

          <v-flex v-if="!change" xs12 text-center class="title">
            <p> 현재 입찰가 </p>
            <h1> {{ ArtInfo.currentprice }}  </h1>
            <p> NB </p>
            <v-text-field v-if="isIn"
            label="원하는 입찰가를 입력해주세요."
            type="number"
            suffix="만원"
            v-model="newprice"
            >
            </v-text-field>
            <v-btn 
            :disabled="newprice <= ArtInfo.currentprice"
            elevation="2"
            fab
            height="100px"
            width="100px"
            class="mt-5"
            @click="high">
            <v-text class="icon">
                👋🏻
            </v-text>
            </v-btn>

        <div class="mt-7">
            {{countDown}}
        </div>
        </v-flex>

        <v-flex v-else xs12 text-center class="title">
            <p> 현재 입찰가 </p>
            <h1> {{ currentprice }}  </h1>
            <p> NB </p>
            <v-text-field v-if="isIn"
            label="원하는 입찰가를 입력해주세요."
            type="number"
            suffix="만원"
            v-model="newprice"
            >
            </v-text-field>
            <v-btn 
            :disabled="newprice <= currentprice"
            elevation="2"
            fab
            height="100px"
            width="100px"
            class="mt-5"
            @click="high">
            <v-text class="icon">
                👋🏻
            </v-text>
            </v-btn>

        <div class="mt-7">
            {{countDown}}
        </div>
        </v-flex>
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
    </v-main>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"

export default {
    mounted() {
        this.checkNow()
        this.checkisIn()
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
            timeline: [],
            fasttime: '3:30',
            dialog: false,
            currentprice: 0,
            token: null,
            config: null,
            isNow: true,
            ArtInfo: null,
            fastTime: '0:0'
        }
    },
    methods: {
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
                        title : res2.data.data.title,
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
            this.connection.send(JSON.stringify({
                "price": this.newprice,
                "user": this.userInfo.username
            }))
            .then(res2=>{ 
                this.currentprice = this.newprice,
                this.timeline = res2.data.data.timeline
                this.countDown = 15
                this.countDownTimer()
            })
            .catch(()=>{ alert('경매에 실패했습니다.'), this.countDown = 15,this.countDownTimer() })

        },
        enterAuction() { //경매에 참여하기
            this.dialog = false
            this.connection = new WebSocket('ws://192.249.18.172:443')

            this.connection.onopen = function(Event){
                console.log(Event)
                console.log("Successfully connected to the auction")
            }

            axios.get("http://192.249.18.172:80/start_bidding/productid/10/participate", this.config)
            .then(res3=>{ 
                this.currentUsers = res3.data.currentUsers
                localStorage.setItem("BidIn", true)
                this.checkisIn()
            })
            .catch(()=>{ alert('경매 참여에 실패했습니다.') })
        },
        countDownTimer() {
            this.connection.onmessage = function(Event){
                console.log(Event)
            }
            if(this.countDown > 0) {
                setTimeout(()=> {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            } else {
                alert( '경매가 종료되었습니다.')
            }
        }
    },
    computed: {
      ...mapState(["userInfo"])
    },

}

</script>

<style scoped>

.title {
    font-family: KakaoBig,Apple SD Gothic Neo,Malgun Gothic,맑은 고딕,sans-serif;
    font-size: 46px;
    line-height: 60px;
    color: var(--baseForeground);
    letter-spacing: -1px;
    background-size: 72px 72px;
}

.title2 {
    font-family: KakaoBig,Apple SD Gothic Neo,Malgun Gothic,맑은 고딕,sans-serif;
    font-size: 70px;
    line-height: 60px;
    color: var(--baseForeground);
    letter-spacing: -1px;
    background-size: 72px 72px;
}

.icon {
    font-size: 70px;
}

</style>