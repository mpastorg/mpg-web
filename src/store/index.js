import Vue from 'vue';
import Vuex from 'vuex';
import {data} from '../shared';

Vue.use(Vuex)

const state = {
  activityTypes: [],
  destEmails: [],
  lnurl: ''
};
const mutations = {
  getLnurl(state,lnurl){
    
    state.lnurl = lnurl;
  },
  getActivityTypes(state,activityTypes){
    
    state.activityTypes = activityTypes;
  },
  getDestEmails(state,destEmails){
    state.destEmails = destEmails;
  }, 
  deleteDestEmail(state,rowtableid){
    state.destEmails = [...state.destEmails.filter(i=> i.id != rowtableid)];
  }, 
  addDestEmail(state,destEmail){
    state.destEmails.push(destEmail);
  }, 

};
const actions = {
  async getLnurlAction({commit},username){
    const lnurl = await data.getLnurl(username);
    lnurl.encoded = 'lightning:'+lnurl.encoded;
    commit('getLnurl',lnurl);
  },
  async getActivityTypesAction({commit}){
    const activityTypes = await data.getActivityTypes();
    commit('getActivityTypes',activityTypes);
  },
  async getDestEmailsAction({commit}){
    const destEmails = await data.getDestEmails();
    commit('getDestEmails',destEmails);
  }, 
  async deleteDestEmailAction({commit},rowtableid){
    const deletedEmailRowId = await data.deleteEmail(rowtableid);
    commit('deleteDestEmail',deletedEmailRowId)
  }, 
  async reSendDestEmailAction({commit},rowtableid){
    await data.reSendDestEmailAction(rowtableid);
    const destEmails = await data.getDestEmails();
    commit('getDestEmails',destEmails);
  }, 
  async addDestEmailAction({commit},destEmail){
    const addedEmailRowId = await data.addEmail(destEmail);
    if (addedEmailRowId != null)
      commit('addDestEmail',destEmail)
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
