import { createStore } from 'vuex'

export default createStore({
  state: {
    userData: {},
    token:'',
    orderTotal:{},
  },
  getters: {
    storageToken:state =>state.token,
    storageUserData:state =>state.userData,
    storageOrderTotal:state =>state.orderTotal,
  },
  mutations: {

  },
  actions: {
    setToken:({state},value) =>{ state.token =value;
      localStorage.setItem('authToken', value);
    },
    setUserData:({state},value) => {state.userData = value,
      localStorage.setItem('userData', JSON.stringify(value));
    },

    setOrderTotal:({state},value)=>{state.orderTotal =value,
    localStorage.setItem('orderTotal', JSON.stringify(value));
    },
  },
  modules: {
  }
})
