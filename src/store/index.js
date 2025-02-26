import { createStore } from "vuex";

const store = createStore({
  state: {
    wallValue: null,
    rectangleValue:null,
  },
  mutations: {

    wallValues(state, value) {
      state.wallValue = value;

    },
    rectangeleValues(state,value){
      state.rectangleValue  = value

    }
  }
});

export default store;