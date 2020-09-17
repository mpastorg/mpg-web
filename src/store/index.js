import Vue from 'vue';
import Vuex from 'vuex';
import {data} from '../shared';

Vue.use(Vuex)

const state = {
  activityTypes: [],
  destEmails: [],
};
const mutations = {
  getActivityTypes(state,activityTypes){
    
    state.activityTypes = activityTypes;
  },
  getDestEmails(state,destEmails){
    state.destEmails = destEmails;
  }

};
const actions = {
  async getActivityTypesAction({commit}){
    const activityTypes = await data.getActivityTypes();
    commit('getActivityTypes',activityTypes);
  },
  async getDestEmailsAction({commit}){
    const destEmails = await data.getDestEmails();
    commit('getDestEmails',destEmails);
  }
};
const getters = {};
const modules = {};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  getters,
})
