<template>
  <n-modal
    v-model:show="show"
    :bordered="false"
    class="modal"
    preset="card"
    size="huge"
    title="新会议"
  >
    <n-input
      v-model:value="value" clearable placeholder="名称" type="text"
      @keydown.enter="create"
    />
    <div class="buttons">
      <n-button
        type="primary"
        @click="create"
      >
        确认
      </n-button>
    </div>
  </n-modal>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "CreateSession",
  data() {
    return {
      value: '',
      show: false,
    }
  },
  computed: {
    ...mapState([]),
  },
  methods: {
    async create() {
      const r = await this.axios.put('/sessions', {name: this.value})
      this.$store.commit('updateSession', r.data)
      this.value = ''
      this.show = false
    },
  }
}
</script>

<style scoped>
.buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

</style>
