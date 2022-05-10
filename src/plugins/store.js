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
    updateMotion(state, motion) {
      for (let i = state.sessions.length - 1; i >= 0; i--) {
        const motions = state.sessions[i].motions;
        for (let j = motions.length - 1; j >= 0; j--) {
          if (motions[j].id === motion.id) {
            motions[j] = motion;
            return;
          }
        }
      }
    },
    addMotion(state, motion) {
      state.sessions[state.sessions.length - 1].motions.push(motion);
    },
  },
});

export default store;
