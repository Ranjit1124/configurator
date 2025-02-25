import { createStore } from "vuex";

const store = createStore({
  state: {
    width: 5,
    height: 5,
    tootltip:null,
    defaultWallValue:null,
  },
  mutations: {
    SET_WIDTH(state, newWidth) {
      console.log("store", newWidth);
      state.width = newWidth;
    },
    SET_HEIGHT(state, newHeight) {
        console.log("store", newHeight);

      state.height = newHeight;
    },
    tooltip(state, tootltip){
      console.log('tootltip',tootltip);
      
      state.tootltip = tootltip;

    },
    defaultWallValue(state,value){
state.defaultWallValue = value
console.log('sturevalue',value);

    }
  }
});

export default store;
