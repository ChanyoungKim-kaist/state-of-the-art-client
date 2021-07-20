<template>
    <v-container fluid class="primary">
        <v-item-group 
            v-model="selected"
            class="mt-10 pa-10"
            multiple> 
        <v-row dense>
            <v-col v-for="n in arts" cols="12" :key="n" md="3" sm="2">
                <v-item  v-slot="{ active, toggle }"> 
                <v-card
                    class="mx-auto mt-3"
                    max-width="400"
                    @click="toggle">
                    <v-img
                    :src="n.src"
                    height="200px"
                    ></v-img>
                    <v-card-title class="title">
                    {{n.engTitle}}
                    </v-card-title>
                    <v-card-subtitle class="date">
                    {{ n.date }}
                    </v-card-subtitle>
                    <v-col align="end" class="price">
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
        <audio  id="audioval" src="https://www.zamzar.com/download.php?uid=6a846a41b61d224729e6fff7e6e15c38-4e892ae119841b18&targetId=A1rZfaiPm4_Y9pY_ZE_Zf5XPkpNjIxyhkM3&fileID=p1fb2fvrr7244cbu58e1vs1a8k4.mp3"
        autoplay loop></audio>
    </v-card>
      </v-footer> 
    </v-container>
</template>

<script>
import axios from "axios"

export default {
    
    data() {
        return {
            selected: null,
            token: null,
            config: null,
            refresh: false,
            marker: true,
            arts : [
      {
        title : "CPRKR",
        engTitle : "CPRKR",
        subtitle: "Jean-Michel Basquiat (1982)",
        content: "Style: Neo-Expressionism,\n Street artGenre: figurative\n Media: acrylic, crayon, canvas\n Location: Private Collection\n Dimensions: 152.5 x 101.5 cm",
        src: require("../assets/origin/origin0.jpeg"),
        date: "2021-07-30",
        price: 500
      },
      {
        title : "Dressing for the Carnival",
        engTitle : "Dressing for the Carnival",
        subtitle: "Winslow Homer (1877)",
        content: "Having visited Virginia as an artist-correspondent during the Civil War, Homer returned there at least once during the mid-1870s, apparently to observe what had happened to the lives of former slaves during the first decade of Emancipation. The brilliant light and color of this scene, originally titled \"Sketch–4th of July in Virginia,\" contradict its more solemn meaning. The central figure is being dressed as Harlequin, the clown and social outcast of European comic theater. The strips of cloth being sewn to his costume, however, derive from African ceremonial dress and from the festival of Jonkonnu, when slaves left their quarters to dance at their master's house. In the years following the Civil War, aspects of Jonkonnu became part of the celebration of the Fourth of July and Emancipation. Here, the pageantry of multihued costumes suggests a festive celebration, but it also reflects the dislocation of traditional African culture and the beginnings of its transformation into a new tradition.",
        src: require("../assets/origin/origin1.jpeg"),
        date: "2021-07-31",
        price: "300"
        
      },
      {
        title : "Cleopatra Testing Poisons on Those Condemned to Death",
        engTitle : "Cleopatra Testing Poisons on Those Condemned to Death",
        subtitle: "Alexandre Cabnel (1887)",
        content: "Cleopatra Testing Poisons on Condemned Prisoners (Cléopâtre essayant des poisons sur des condamnés à mort) is an 1887 painting by the French artist Alexandre Cabanel. It is now in the Royal Museum of Fine Arts, Antwerp. It shows Cleopatra VII sitting at a banquet observing the effects of poisons on prisoners condemned to death. Cabanel had always had a taste for historical and orientalist themes and when the painting was first seen by the Parisian public he was feted by the critics and showered with honours. Several international collectors attempted to buy the painting.",
        src: require("../assets/origin/origin2.jpeg"),
        date: "2021-08-01",
        price: "680"
      },
      {
        title : "Un Chien Andalou",
        engTitle : "Un Chien Andalou",
        subtitle: "Salvador Dali (1928)",
        content: "Un Chien Andalou  is a 1929 Franco-Spanish silent surrealist short film by Spanish director Luis Buñuel and artist Salvador Dalí. Buñuel's first film, it was initially released in a limited capacity at Studio des Ursulines in Paris, but became popular and ran for eight months. Un Chien Andalou has no plot in the conventional sense of the word. With disjointed chronology, jumping from the initial 'once upon a time' to 'eight years later' without events or characters changing, it uses dream logic in narrative flow that can be described in terms of the then-popular Freudian free association, presenting a series of tenuously related scenes.",
        src: require("../assets/origin/origin3.jpeg"),
        date: "2021-08-15",
        price: "450"
      },
      {
        title : "Child with dove",
        engTitle : "Child with dove",
        subtitle: "Pablo Picasso (1901)",
        content: "Child with a Dove, also described as Child Holding a Dove, Child with a Pigeon, Girl with a Dove and Girl with a Pigeon, is an oil on canvas painting by the Spanish artist Pablo Picasso, which he created in 1901 at the start of his Blue Period. The painting is a depiction of a young girl in a white dress holding a white dove, and represents an important transitional moment in the artist’s career. It was on public display at the National Gallery in London, England for nearly four decades before its private sale in 2012, when it achieved a price of £50 million.",
        src: require("../assets/origin/origin4.jpeg"),
        date: "2021-08-13",
        price: "600"
      },
      {
        title : "Seated breton girl",
        engTitle : "Seated breton girl",
        subtitle: "Paul Gaugin (1889)",
        content: "Style: Post-Impressionism\n Period: Breton period\n Genre: genre painting\n Media: oil, canvas\n Location: Ny Carlsberg Glyptotek, Copenhagen, Denmark",
        src: require("../assets/origin/origin5.jpeg"),
        date: "2021-08-22",
        price: "500"
      },
      {
        title : "Simultaneous Counter Composition",
        engTitle : "Simultaneous Counter Composition",
        subtitle: "Theo van Doesburg (1930)",
        content: "Simultaneous Counter-Composition focuses on the balance of the squares. All of the colored shapes are cut-off squares and even the canvas itself is a square. By using squares, van Doesburg promotes the purely geometric form of painting.",
        src: require("../assets/origin/origin6.jpeg"),
        date: "2021-09-13",
        price: "300"
      },
      {
        title : "Going Home, Brittany",
        engTitle : "Going Home, Brittany",
        subtitle: "Frank Mason (1965)",
        content: "Date: c.1965\n Style: Realism, Classical Realism\n Genre: cityscape\n Media: canvas, oil\n Dimensions: 76.2 x 91.44 cm",
        src: require("../assets/origin/origin7.jpeg"),
        date: "2021-09-15",
        price: "400"
      },
      {
        title : "Girl with Ballon",
        engTitle : "Girl with Ballon",
        subtitle: "Banksy (2002)",
        content: "Girl with Balloon (also, Balloon Girl or Girl and Balloon) is a 2002-started London series of stencil murals by the graffiti artist Banksy, depicting a young girl with her hand extended toward a red heart-shaped balloon carried away by the wind. The first work was on Waterloo Bridge, and other murals were around London, though none remain there. Banksy has several times used variants of this design to support social campaigns: in 2005 about the West Bank barrier, in 2014 about the Syrian refugee crisis, and also about the 2017 UK election. A 2017 Samsung poll ranked Girl with Balloon as the United Kingdom's number one favourite artwork.",
        src: require("../assets/origin/origin8.jpeg"),
        date: "2021-09-28",
        price: "800"
      },
      {
        title : "Saturday Night",
        engTitle : "Saturday Night",
        subtitle: "Clementine Hunter (1968)",
        content: "Hunter lived near this popular Saturday night Honky Tonk, and in this particular painting, she captures all the late-night action, including drinking, fighting and violence. which she didn't approve of.",
        src: require("../assets/origin/origin9.jpeg"),
        date: "2021-10-01",
        price: "600"
      },
      {
        title : "Space",
        engTitle : "Space",
        subtitle: "Whanki, Kim (1971)",
        content: "eeee",
        src: require("../assets/origin/origin10.jpeg"),
        date: "2021-11-01",
        price: "700"
      },
                ]
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
    computed: {
      isMarker(){
            if (this.marker) {
                return 'fas fa-volume-up'
            }
            else {
                return 'fas fa-volume-mute'
            }
        },
    },
    watch: {
        selected: function(data) {
            localStorage.setItem("selected", data)
            this.token = localStorage.getItem("access_token")
            this.config = {
                    headers: {
                        "token": this.token
                    }
            }
            axios.post("http://192.249.18.172:80/drawings/wishlist", {data: data}, this.config)
            .then(res=>{ 
                if (res.data.ok) {
                    alert('위시리스트가 수정되었습니다.')
                }
            })
            .catch(()=>{ alert('통신 실패') })
        }
    },
}


</script>
<style scoped>
.bg {
    background-color: rgb(248, 248, 248);
}
* {
   cursor: url(../assets/c3.png), grab;

}

.title{
font-family: noto-sans-cjk-kr, sans-serif;
font-weight: 900;
font-style: normal;
font-size:16px;
word-break: keep-all;
text-align: start;
letter-spacing: -0.6px;
line-height: 100%;
}

.date{
    font-family: raleway, sans-serif;
    font-weight: 500;
    font-style: normal;
    color: black;
    font-size:16px;
}

.price{
    font-family: raleway, sans-serif;
    font-weight: 500;
    font-style: normal;
    color: black;
    font-size:18px;
  
}
</style>
