<template>
  <div >
    <h1 class="text-center">Hello Mypage!</h1>
    <!-- <router-view></router-view> -->
    <v-tabs
      grow
    >
      <v-tab
        router :to="{name: 'mypage1'}"
      > My page 1 구매내역
      </v-tab>
      <v-tab
        router :to="{name: 'mypage2'}"
      >
        My page 2 좋아요
      </v-tab>
      <v-tab
        router :to="{name: 'mypage3'}"
      >
        My page 3 프로필 설정
      </v-tab>
    
    </v-tabs>

    <v-col>
        <v-card
            class="mx-auto"
            max-width="400"
        >
            <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
            Number 10
            </v-card-subtitle>

            <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
            <v-btn
                color="orange"
                text
            >
                Share
            </v-btn>

            <v-btn
                color="orange"
                text
            >
                Explore
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
  </div>

</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>