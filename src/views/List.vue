<template>
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
      ></Motion>
    </n-collapse-item>
  </n-collapse>
</template>

<script>
import {mapState} from "vuex"
import {NCollapse, NCollapseItem, NList, NListItem} from 'naive-ui'
import {displayTime} from "@/utils"
import Motion from "@/components/Motion.vue";

export default {
  name: "List",
  components: {
    Motion,
    NCollapseItem, NCollapse, NList, NListItem
  },
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
}
</style>
