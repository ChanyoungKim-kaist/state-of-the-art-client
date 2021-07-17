import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store/index"

Vue.use(VueRouter)

const rejectAuthUser = (to, from, next) => {
  if (store.state.isLogin) {
    //이미 로그인 된 유저
    alert('이미 로그인을 하였습니다.')
    next('/')
  } else {
    next()
  }
}

const onlyAuthUser = (to, from, next) => {
  if (store.state.isLogin == false) {
    alert('로그인을 해야합니다.')
    next('/')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login', 
    name: 'login',
    beforeEnter: rejectAuthUser,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/mypage', 
    name: 'mypage',
    beforeEnter: onlyAuthUser,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Mypage.vue')
  },
  {
    path: '/upload', 
    name: 'upload',
    beforeEnter: onlyAuthUser,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Upload.vue')
  },
  {
    path: '/live', 
    name: 'live',
    beforeEnter: onlyAuthUser,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Live.vue')
  },
  {
    path: '/mypage', 
    name: 'mypage',
    component: () => import(/* webpackChunkName: "about" */ '../views/Mypage.vue')
  },
  {
    path: '/mypage/mypage1', 
    name: 'mypage1',
    component: () => import(/* webpackChunkName: "about" */ '../views/Mypage1.vue')
  },
  {
    path: '/mypage/mypage2', 
    name: 'mypage2',
    component: () => import(/* webpackChunkName: "about" */ '../views/Mypage2.vue')
  },
  {
    path: '/mypage/mypage3', 
    name: 'mypage3',
    component: () => import(/* webpackChunkName: "about" */ '../views/Mypage3.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
