import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

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
    login({state, commit}, loginObj) {
        let selectedUser = null
        state.allUsers.forEach(user =>{
          if (user.email == loginObj.email) selectedUser = user
        })
        if (selectedUser == null || selectedUser.password !== loginObj.password)
          commit("loginError")
        else {
          commit("loginSuccess", selectedUser)
          router.push({name:"home"})
        }
    },
    logout({commit}){
      commit("logout")
      router.push({name: "home"}) 
    }
  },
  modules: {
  }
})