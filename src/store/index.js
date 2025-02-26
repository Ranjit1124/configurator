import { createStore } from "vuex";

const store = createStore({
  state: {
    wallValue:null,
  },
  mutations: {
    
    wallValues(state, value){
      state.wallValue = value;

    }
  }
});

export default store;
