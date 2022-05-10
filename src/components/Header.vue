<template>
  <header>
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
import {GithubFilled} from '@vicons/antd'

export default {
  name: 'Header',
  components: {
    GithubFilled,
  },
}
</script>

<style scoped></style>
