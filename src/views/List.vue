<template>
  <n-collapse accordion class="list page" @update:expanded-names="sessionOnClick">
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
  min-width: 10rem;
  width: 25%;
  margin: 0 1rem;
}

.side-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
