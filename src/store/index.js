import { createStore } from "vuex";

const store = createStore({
  state: {
    width: 5,
    height: 5,
  },
  mutations: {
    SET_WIDTH(state, newWidth) {
      console.log("store", newWidth);
      state.width = newWidth;
    },
    SET_HEIGHT(state, newHeight) {
        console.log("store", newHeight);

      state.height = newHeight;
    }
  }
});

export default store;
