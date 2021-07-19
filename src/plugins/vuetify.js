import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md',
      },
      theme: {
        themes: {
          light: {
            primary: '#DB173F',
            secondary: '#293038',
            gray1: '#333333',
            gray2: '#666666',
            gray3: '#999999',
          }
        }
      }
});
