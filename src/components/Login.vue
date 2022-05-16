<template>
  <n-modal
    v-model:show="show"
    :bordered="false"
    class="modal"
    preset="card"
    size="huge"
    title="登录"
  >
    <n-input
      v-model:value="name"
      placeholder="用户名（建议实名）"
      type="text"
    />
    <n-input
      v-model:value="email"
      placeholder="邮箱（可选）"
      type="text"
      @keydown.enter="login"
    />
    <div class="buttons">
      <n-button
        type="primary"
        @click="login"
      >
        登录
      </n-button>
    </div>
  </n-modal>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      name: '',
      email: '',
      show: false
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async login() {
      const r = await this.axios.post('/users', {name: this.name, email: this.email})
      this.$store.commit('setUser', r.data)
      this.axios.setToken(this.user.name)
      this.show = false
    }
  },
  created() {
    this.show = !Boolean(this.user.name)
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
