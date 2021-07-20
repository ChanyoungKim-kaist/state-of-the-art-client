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
            src="https://storage.cloudconvert.com/tasks/40f7c442-1eb6-4442-a5ac-b118c22d3ff2/Thankfulness_AdobeStock_331363115_preview.mp3?AWSAccessKeyId=cloudconvert-production&Expires=1626906407&Signature=Hkj5OD1yXrFKHRRK%2BN3FTb5Dop0%3D&response-content-disposition=inline%3B%20filename%3D%22Thankfulness_AdobeStock_331363115_preview.mp3%22&response-content-type=audio%2Fmpeg"
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
