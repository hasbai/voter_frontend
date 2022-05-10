<template>
  <n-modal
    v-model:show="show"
    :bordered="false"
    class="modal"
    preset="card"
    size="huge"
    title="新动议"
  >
    <n-input
      v-model:value="name" class="mb-1"
      clearable placeholder="名称" type="text"
    />
    <n-input
      v-model:value="description"
      clearable
      placeholder="内容"
      type="textarea"
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
  name: "CreateMotion",
  data() {
    return {
      name: '',
      description: '',
      show: false,
    }
  },
  computed: {
    ...mapState([]),
  },
  methods: {
    async create() {
      const r = await this.axios.post('/motions', {
        name: this.name,
        description: this.description
      })
      this.name = ''
      this.description = ''
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
