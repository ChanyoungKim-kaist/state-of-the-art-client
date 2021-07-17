<template>
    <v-main class="grey lighten-2">
      <v-container v-if="isNow">
        <v-layout row>
          <v-flex xs12 text-center class="title">
                <h1> 제품 이름 </h1>
                <p> 간단한 소개 </p>
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
            
              <v-list two-line>
                <v-list-item>
                    <v-list-item-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    <v-list-item-subtitle>Author</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                </v-list>

                <v-list two-line>
                <v-list-item>
                    <v-list-item-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    <v-list-item-subtitle>Author</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                </v-list>

                <v-list two-line>
                <v-list-item>
                    <v-list-item-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    <v-list-item-subtitle>Author</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                </v-list>

                <v-list two-line>
                <v-list-item>
                    <v-list-item-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    <v-list-item-subtitle>Author</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
                <v-list two-line>
                <v-list-item>
                    <v-list-item-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    <v-list-item-subtitle>Author</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
                <v-list two-line>
                <v-list-item>
                    <v-list-item-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    <v-list-item-subtitle>Author</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
                <v-list two-line>
                <v-list-item>
                    <v-list-item-avatar>
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                    <v-list-item-subtitle>Author</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
                 
            </v-sheet>
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
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                ></v-carousel-item>
            </v-carousel>

            <v-timeline dense clipped >
                <v-slide-x-transition
                    group
                >
                    <v-timeline-item 
                    v-for="event in timeline"
                    :key="event.id"
                    class="mr-4 mb-4"
                    color="pink"
                    small
                    >
                    <v-row justify="space-between">
                        <v-col
                        cols="7"
                        v-text="event.id" 
                        ></v-col>
                        
                        <v-col
                        class="text-right"
                        cols="5"
                        v-text=" event.text"
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

          <v-flex xs12 text-center class="title">
                <p> 현재 입찰가 </p>
                <h1> {{price}}  </h1>
                <p> 만원</p>
                <v-text-field
                label="원하는 입찰가를 입력해주세요."
                type="number"
                suffix="만원"
                v-model="newprice"
                >
            </v-text-field>
                <v-btn 
                :disabled="newprice <= price"
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
                {{timerCount2}} : {{timerCount}}
            </div>
            </v-flex>


          </v-col>
        </v-layout>
      </v-container>

      <v-container v-else >
        
      </v-container>
    </v-main>
</template>

<script>

export default {
    data() {
        return {
            items: [
                {src: "https://cdn.vuetifyjs.com/images/cards/house.jpg"},
                {src: "https://cdn.vuetifyjs.com/images/cards/house.jpg"},
                {src: "https://cdn.vuetifyjs.com/images/cards/house.jpg"},
                {src: "https://cdn.vuetifyjs.com/images/cards/house.jpg"}
            ],
            price: 5000,
            newprice: null,
            timerCount: 59,
            timerCount2: 1,
            isNow: true,
            timeline: [
                {text: "5000", id: "2", time: "20"},
                {text: "hello", id: "2", time: "20"},
                {text: "hello", id: "2", time: "20"},
            
            ]
        }
    },
    methods: {
        high(){

        }
    },
    watch: {

            timerCount: {
                handler(value) {
                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }

                },
                immediate: true // This ensures the watcher is triggered upon creation
            },
            timerCount2: {
                handler(value) {

                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount2--;
                            this.timerCount += 59;
                        }, 60000);
                    }

                },
                immediate: true // This ensures the watcher is triggered upon creation
            }

        }

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