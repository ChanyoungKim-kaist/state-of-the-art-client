import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vb from 'vue-babylonjs'

Vue.config.productionTip = false
Vue.use(vb);
 
export const eventBus = new Vue({
  methods: {
    listEdit(memo, index) {
      this.$emit('listEdit', memo, index)
    } 
  }
})

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    this.$store.dispatch('getMemberInfo')
  },
  render: h => h(App)
}).$mount('#app')


