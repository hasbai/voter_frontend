<template>
  <header>
    <div class="info">
      <n-switch @update:value="changeAdminMode"/>
      <div>Admin Mode: {{ adminMode ? 'on' : 'off' }}</div>
    </div>
    <div class="github">
      <n-button
        :bordered="false"
        href="https://github.com/hasbai/voter_frontend"
        tag="a"
        target="view_window"
      >
        <span style="margin-right: 0.5rem">Github Repo</span>
        <n-icon :size="'1.5rem'">
          <GithubFilled></GithubFilled>
        </n-icon>
      </n-button>
    </div>
  </header>
</template>

<script>
import {mapState} from "vuex"
import {GithubFilled} from '@vicons/antd'

export default {
  name: 'Header',
  components: {
    GithubFilled,
  },
  computed: {
    ...mapState(['adminMode']),
  },
  methods: {
    changeAdminMode(mode) {
      this.$store.commit('setAdminMode', mode)
    }
  }
}</script>

<style scoped>
header {
  height: 4rem;
  padding: 0 2rem;
  /*position: sticky;*/
  /*top: 0;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info {
  display: flex;
}

.info div {
  margin: 0 0.5rem;
}

</style>
