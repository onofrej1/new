import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import CrudModels from './../CrudModels';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	state: {
    apiUrl: 'http://localhost/web/laravel/public',
    activeResource: 'page',
    resourceData: {},
	},
  getters: {
    getActiveResourceData: state => state.resourceData[state.activeResource],
  },
	mutations: {
    setActiveResource(state, payload) {
      state.activeResource = payload;
    },
    setResourceData(state, payload) {
      state.resourceData[payload.resourceName] = payload.resourceData;
      state.resourceData = {...state.resourceData, [payload.resourceName]: payload.resourceData};
    }
	},
	actions: {
    setActiveResource({ commit}, resourceName) {
      commit('setActiveResource', resourceName);
    },
    fetchResourceData({ commit, state}, resourceName) {
     /* setTimeout(function()
    {
        writeNext(i + 1);

    }, 2000);*/

      axios.get(state.apiUrl+"/"+resourceName)
          .then((response)  =>  {
          //console.log('data', response.data);
          commit('setResourceData', {
            resourceName,
            resourceData: response.data
          });
          
      }, (error)  =>  {
        console.log(error);
      })
    }
	}
})

