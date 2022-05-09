import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [
    createPersistedState({
      paths: ["username"],
    }),
  ],
  state() {
    return {
      username: "",
      users: [],
      sessions: [],
      currentMotion: {
        id: Number,
        name: String,
        description: String,
        status: Number,
        createdAt: String,
        updatedAt: String,
        userID: Number,
        for: [],
        against: [],
        abstain: [],
      },
    };
  },
  getters: {},
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setSessions(state, sessions) {
      state.sessions = sessions;
    },
    updateSession(state, session) {
      const index = state.sessions.findIndex((i) => i.id === session.id);
      if (index === -1) {
        state.sessions.push(session);
      } else {
        state.sessions[index] = session;
      }
    },
    setCurrentMotion(state, motion) {
      state.currentMotion = motion;
    },
  },
});

export default store;
