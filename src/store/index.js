import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      time: ''
    },
    actions: {
      fetchTime ({ commit }) {
        return commit('setTime', new Date() )
      }
    },
    mutations: {
      setTime (state, time) {
          state.time = time

      }
    }
  })
}