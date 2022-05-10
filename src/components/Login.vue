<template>
  <n-modal
    v-model:show="showLogin"
    :bordered="false"
    class="modal"
    preset="card"
    size="huge"
    title="登录"
  >
    <n-input v-model:value="value" placeholder="用户名（建议实名）" type="text"/>
    <div class="buttons">
      <n-button
        style="margin-right: 1rem"
        type="primary"
        @click="login"
      >
        登录
      </n-button>
      <n-button type="error" @click="close">退出</n-button>
    </div>
  </n-modal>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState(['username']),
    showLogin() {
      return !this.username
    }
  },
  methods: {
    async login() {
      await this.axios.put('/users/' + this.value)
      this.$store.commit('setUsername', this.value)
    },
    close() {
      window.close()
    }
  },
  created() {

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
