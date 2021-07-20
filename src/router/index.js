import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index"

Vue.use(VueRouter)

// const rejectAuthUser = (to, from, next) => {
//   if (store.state.isLogin) {
//     //이미 로그인 된 유저
//     alert('이미 로그인을 하였습니다.')
//     next('/')
//   } else {
//     next()
//   }
// }

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
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../App.vue')
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Live.vue')
  },
  { path: '/game', 
    name: 'game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Game.vue')
  },
  { path: '/products', 
    name: 'products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/products.vue')
  },
  { path: '/artinfo', 
    name: 'artinfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ArtInfo.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
