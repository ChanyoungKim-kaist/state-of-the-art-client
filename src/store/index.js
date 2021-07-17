import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import axios from "axios"
// const axios = require('axios');

Vue.use(Vuex)
 
export default new Vuex.Store({
  state: {
    userInfo: null,
    allUsers: [
      { id:1, name:"hoza", email:"hoza@gmail.com", password:"123456"},
      { id:2, name:"lego", email:"lego@gmail.com", password:"222222"}
    ],
    isLogin: false,
    isLoginError: false
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
    }
  },
  actions: {
    // 로그인 시도
    login({dispatch}, loginObj) {  // eslint-disable-line no-unused-vars
        // 로그인 -> 토큰 반환
        axios.post("https://reqres.in/api/login", loginObj) // paremeter (=body)
        .then(res => {
          // 성공시 token 이 옴, 토큰을 헤더에 포함
          let token = res.data.token
          // 토큰을 로컬 스토리지에 저장
          localStorage.setItem("access_token", token)
          dispatch("getMemberInfo")
        })
        .catch(() => {
          alert('이메일과 비밀번호를 확인하세요.')
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
      axios.get("https://reqres.in/api/users/2", config)
        .then(response=>{ 
          let userinfo = {
            first_name : response.data.data.first_name,
            last_name : response.data.data.last_name,
            avatar: response.data.data.avatar,
            id : response.data.data.id

          }
          commit('loginSuccess', userinfo)
        })
        .catch(()=>{ alert('이메일과 비밀번호를 확인하세요.') })
    }
  },
  modules: {
  }

})
