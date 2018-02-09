import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export store = new Vuex.Store({
  state: {
    languages: [],
  },
  actions: {
    LOAD_PROJECT_LIST: function ({ commit }) {
      axios.get(this.source)
        .then((response) => {
          commit('SET_PROJECT_LIST', { list: response.data.langs })
        }, (err) => {
          console.log(err)
        })
    }
  },
  mutations: {
    SET_PROJECT_LIST: (state, { list }) => {
      state.languages = list
    }
  },
  getters: {
  },
  modules: {

  }
})
