<template>
    <v-container fluid mt-16>
        <v-item-group
            v-model="selected"
            multiple> 
        <v-row  dense>
            <v-col v-for="n in arts" cols="3" :key="n" md="3" sm="4">
                <v-item  v-slot="{ active, toggle }"> 
                <v-card
                    class="mx-auto mt-3"
                    max-width="400"
                    @click="toggle"
              >
                    <v-img
                    :src="n.src"
                    height="200px"
                    ></v-img>

                    <v-card-title>
                    {{n.title}}
                    </v-card-title>

                    <v-card-subtitle>
                    {{ n.date }}
                    </v-card-subtitle>
                    <v-text>{{check}}</v-text>
                    <v-col align="end">
                        <v-text> {{n.price}} NB </v-text>
                    <v-btn
                  icon
                  dark
                    >
                  <v-icon class="aa" color="primary" >
                    {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                  
                </v-btn>
                </v-col>
                </v-card>
                </v-item>
            </v-col>
        </v-row>
        </v-item-group>
    </v-container>
</template>

<script>
import axios from "axios"

export default {
    
    data() {
        return {
            arts : [ 
                { src: require("../assets/pictures/pictures001.jpeg"),
                  title: "Dressing for the Carnival",
                  date: "2021-08-22",
                  content: "Hello",
                  price: 500,
                  id : 1,
                },
                { src: require("../assets/pictures/pictures002.jpeg"),
                  title: "Dressing for the Carnival",
                  date: "2021-08-22",
                  content: "Hello",
                  price: 500,
                  id : 2,
                },
                { src: require("../assets/pictures/pictures003.jpeg"),
                  title: "Dressing for the Carnival",
                  date: "2021-08-22",
                  content: "Hello",
                  price: 500,
                  id : 3,
                },
                { src: require("../assets/pictures/pictures004.jpeg"),
                  title: "Dressing for the Carnival",
                  date: "2021-08-22",
                  content: "Hello",
                  price: 500,
                  id : 4,
                },
                { src: require("../assets/pictures/pictures005.jpeg"),
                  title: "Dressing for the Carnival",
                  date: "2021-08-22",
                  content: "Hello",
                  price: 500,
                  id : 5,
                },

            ],
            selected: null,
            token: null,
            config: null,
            refresh: false,
    
        }
    },
    created() {
        this.selected = localStorage.getItem("likes")
    },
    methods: {
        myfun(){
            alert('plz')
            
        },
        getArts() {
            axios.get("")
                .then(res2 => {
                if (res2.data.ok) {
                    // let ArtInfo = {
                    //     src : res2.data.data.src,
                    //     title : res2.data.data.title,
                    //     date : res2.data.data.date,
                    //     content : res2.data.data.content,
                    //     price : res2.data.data.price,
                    //     id : res2.data.data.id
                    // }
                    this.arts = res2.data.data.artInfo
                } else {
                    alert('작품을 불러오지 못했습니다.')
                }
                })
                .catch(() => {
                    alert('통신 실패')
                });
        }
    },
    watch: {
        selected: function(data) {
            localStorage.setItem("likes", data)
            for(var k=0; k<data.length; k++){
                this.arts[data[k]].like = !this.arts[data[k]].like
            }
  
            this.token = localStorage.getItem("access_token")
            this.config = {
                    headers: {
                        "token": this.token
                    }
            }
            // axios.post("", data, this.config)
            // .then(res=>{ 
            //     if (res.data.ok) {
            //         alert('위시리스트가 수정되었습니다.')
            //     }
            // })
            // .catch(()=>{ alert('통신 실패 ') })
        }
    }

}


</script>

