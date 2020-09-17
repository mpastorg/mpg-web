import Vue from 'vue';
import Vuex from 'vuex';
import {data} from '../shared';

Vue.use(Vuex)

const state = {
  activityTypes: [
      {activitytype:'all',rowtableid:'e0a28d38-a365-431a-98dd-599dfa0996f4'}
      ,{activitytype:'run',rowtableid:'bd6f335b-059e-4af5-b3f8-0a478e0a3562'}
    ],
};
const mutations = {
  getActivityTypes(state,activityTypes){
    
    state.activityTypes = activityTypes;
  }

};
const actions = {
  async getActivityTypesAction({commit}){
    const activityTypes = await data.getActivityTypes();
    commit('getActivityTypes',activityTypes);
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
