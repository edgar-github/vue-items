import Vue from 'vue'
import Vuex from 'vuex'
import {Action, Record} from '@/app.types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [] as Record[],
  },

  getters: {
    getHistory: (state) => (filter: Action | undefined) => {
      const history = filter !== undefined
        ? state.history.filter(item => item.action === filter)
        : state.history

      return history.sort((a, b) => b.date.getTime() - a.date.getTime())
    }
  },

  mutations: {
    ADD_TO_HISTORY(state, record: Record) {
      state.history.push(record)
    }
  },

  actions: {},

  modules: {}
})
