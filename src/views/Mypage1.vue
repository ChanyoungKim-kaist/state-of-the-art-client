<template>
  <div class="text-center">
    <h1>Hello Mypage!</h1>
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
  </div>

</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>