import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg: 'the cat is naked',
    logged_user: '',
    fb_user_id: ''
  },
  getters: {
    msgl: state => {
      return state.msg.length
    }
  },
  mutations: {
    CHANGE_MSG: (state, msg) => {
      state.msg = msg
    },
    LOG_USER: (state, username) => {
      state.logged_user = username
    },
    LOG_FB: (state, fb_id) => {
      state.fb_user_id = fb_id
    }
  },
  actions: {
  },
  modules: {
  }
})
