import Vue from 'vue'
import Vuex from 'vuex'
import webSocketModule from './webSocketModule'
import dataModule from './dataModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    webSocketModule,
    dataModule
  }
})
