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
    data: () => ({
      items: [
        {
          text: '구매 내역',
          disabled: false,
          href: 'mypage/bought',
        },
        {
          text: '판매 내역',
          disabled: false,
          href: 'mypage/sold',
        },
        {
          text: '프로필 설정',
          disabled: false,
          href: 'mypage/profile',
        },
      ],
    }),
}

</script>

<style scoped>

.title {
    padding-top: 30px;
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
