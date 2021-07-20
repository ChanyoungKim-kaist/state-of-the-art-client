<template>
  <div id="app">
    <viewport></viewport>
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
            <audio  id="audioval" 
            src="https://server38.freeconvert.com/converted/ebc491017253/Bubble-Jump_AdobeStock_331813116_preview.mp3"
            autoplay loop></audio>
        </v-card>
    </v-footer>
  </div>
  
</template>

<script>
import ViewPort from "@/components/ViewPort.vue";
//import ControlPanel from "@/components/ControlPanel.vue";
export default {
  data() {
    return {marker: true}
  },
  components: {
    viewport: ViewPort,
    // marker: true
    //panel: ControlPanel
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
};
</script>


<style scoped>
* {
   cursor: url(../assets/c2.png), grab;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px;
}
canvas {
  position: relative;
}
#app {
  height: 100%;
}
</style>
