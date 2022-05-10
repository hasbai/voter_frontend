import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [
    createPersistedState({
      paths: ["user"],
    }),
  ],
  state() {
    return {
      user: {},
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
    setUser(state, user) {
      state.user = user;
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
      const latestMotions = state.sessions[state.sessions.length - 1].motions;
      if (
        latestMotions.length === 0 ||
        latestMotions[latestMotions.length - 1].id === motion.id
      ) {
        latestMotions.push(motion);
      }
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
  },
});

export default store;
