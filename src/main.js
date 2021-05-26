import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Bootstrap from 'bootstrap'
// Vue.use(Bootstrap)


Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  created() {
    const _this = this;
    store.dispatch("webSocketModule/setConnection");
    const connection = store.getters['webSocketModule/getConnection'];

    connection.onopen = function (event) {
      _this.$store.dispatch("webSocketModule/setSocketOpen");
    };
  },
  render: function (h) { return h(App) }
}).$mount('#app')
