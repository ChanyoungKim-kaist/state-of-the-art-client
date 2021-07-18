import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import axios from "axios"
// const axios = require('axios');

Vue.use(Vuex)
 
export default new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false,
    isNow: true,
    fastTime: null,
  },
  mutations: { //state값을 변화시키는 것
    // 로그인이 성공했을 때
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
    },
    loginError(state){
      state.isLogin = false
      state.isLoginError = true
    },
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
    },
  },
  actions: {
    // 로그인 시도
    login({dispatch}, loginObj) {  // eslint-disable-line no-unused-vars
        // 로그인 -> 토큰 반환
        axios.post("http://192.249.18.172:80/login/", loginObj) // paremeter (=body)
        .then(res => {
          // 성공시 token 이 옴, 토큰을 헤더에 포함
          // if (res.data.ok) {
            let token = res.data.token
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem("access_token", token)
            dispatch("getMemberInfo")
          // } else {
          //   alert('이메일과 비밀번호를 확인하세요.')
          // }
        })
        .catch((error) => {
          console.log('error : ', error);
          alert('통신실패')
        });
    },
    logout({commit}){
      commit("logout")
      localStorage.removeItem('access_token')
      router.push({name: "home"}) 
    },
    getMemberInfo({commit}) {
      let token = localStorage.getItem("access_token")
      let config = {
        headers : {
          "token": token
        }
      }
      // 토큰 -> userinfo 반환
      // 새로고침 -> 토큰만 가지고 userinfo 요청
      axios.get("http://192.249.18.172:80/login/request_userinfo/", config)
        .then(response=>{ 
          if (response.data.ok) {
            let userinfo = {
              username : response.data.data.username,
              avatar : response.data.data.avatar,
              money : response.data.data.money,
              wish : response.data.data.wish,
              MyArt : response.data.data.MyArt
            }
            commit('loginSuccess', userinfo)
          }
          else alert('이메일과 비밀번호를 확인하세요.')
        })
        .catch(()=>{ alert('이메일과 비밀번호를 확인하세요.') })
    },
    // checkNow({commit}) {
    //   axios.get("")
    //     .then(res2 => {
    //       if (res2.data.ok) {
    //         commit('changeNow')
    //         let ArtInfo = {
    //           currentprice : res2.data.data.currentprice,
    //           title : res2.data.data.title,
    //           context : res2.data.data.context,
    //           pictures : res2.data.data.pictures
    //         }
    //         commit('setArtInfo', ArtInfo)
    //         commit('pictures', res2.data.data.pictures)
    //       } else {
    //         let fastTime = res2.data.fasttime
    //         commit('fastTime', fastTime)
    //       }
    //     })
    //     .catch(() => {
    //       alert('live 실패')
    //     });
    // }
  },
  modules: {
  }

})
