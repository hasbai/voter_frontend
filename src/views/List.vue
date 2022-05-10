<template>
  <div class="side-bar">
    <n-collapse accordion class="list" @update:expanded-names="sessionOnClick">
      <n-collapse-item
        v-for="(session, i) in sessions"
        :key="i" :name="session.id"
        :title="session.name"
      >
        <template #header-extra>
          <span class="ml-1">{{ sessionTime(session) }}</span>
        </template>
        <Motion
          v-for="(motion, j) in session.motions"
          :key="j"
          v-bind="motion"
          @click="setMotion(motion)"
        ></Motion>
      </n-collapse-item>
    </n-collapse>
    <div class="buttons">
      <n-button @click="create('session')">create session</n-button>
      <n-button @click="create('motion')">create motion</n-button>
      <create-session ref="session"></create-session>
      <create-motion ref="motion"></create-motion>
    </div>
  </div>

</template>

<script>
import {mapState} from "vuex"
import {displayTime} from "@/utils"

export default {
  name: "List",
  computed: {
    ...mapState(['sessions']),
  },
  methods: {
    sessionTime(session) {
      return displayTime(session.createdAt)
    },
    async getSessions() {
      const r = await this.axios.get('/sessions')
      this.$store.commit('setSessions', r.data)
    },
    async getSession(id) {
      const r = await this.axios.get('/sessions/' + id)
      this.$store.commit('updateSession', r.data)
    },
    create(name) {
      this.$refs[name].show = true
    },
    sessionOnClick(array) {
      if (array.length > 0) {
        this.getSession(array[0])
      }
    },
    setMotion(motion) {
      this.$store.commit('setCurrentMotion', motion)
    }
  },
  created() {
    this.getSessions()
  }
}
</script>

<style scoped>
.list {
  width: max-content;
  min-width: 10rem;
  margin: 0 1rem;
}

.side-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.buttons button {
  margin: 0.5rem 0;
}
</style>
