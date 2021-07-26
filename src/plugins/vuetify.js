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
            primary: '#F73100',
            secondary: '#00838f',
            mucolor: '#1E35AD',
            aucolor: '#00838f',
            gamecolor: '#757575',
            gray1: '#333333',
            gray2: '#666666',
            gray3: '#999999',
          }
        }
      }
});
