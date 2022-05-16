<template>
  <div class="user">
    <n-avatar
      :fallback-src="fallbackSrc"
      :src=avatarSrc
      round
      size="small"
      @error="generateAvatarURL"
    />
    {{ name }}
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  name: "User",
  props: {
    id: Number,
    name: String,
    email: String
  },
  data() {
    return {
      fallbackSrc: ''
    }
  },
  computed: {
    avatarSrc() {
      const md5 = CryptoJS.MD5(this.email)
      return `https://gravatar.loli.net/avatar/${md5}?d=404`
    },
  },
  methods: {
    async generateAvatarURL() {
      let text = this.name.substring(0, 4)

      const fontSize = 100
      const canvasSize = 2.5 * fontSize
      const fontWeight = 'normal'
      const colors = [
        '#d32f2f',
        '#c2185b',
        '#7b1fa2',
        '#512da8',
        '#303f9f',
        '#1976d2',
        '#0288d1',
        '#0097a7',
        '#00796b',
        '#388e3c',
        '#689f38',
        '#afb42b',
        '#fbc02d',
        '#ffa000',
        '#f57c00',
        '#e64a19',
        '#5d4037',
        '#616161',
        '#455a64',
      ]

      const canvas = new OffscreenCanvas(canvasSize, canvasSize)
      const context = canvas.getContext('2d');
      //头像背景颜色设置
      context.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#FFFFFF';
      context.font = fontWeight + ' ' + fontSize + 'px sans-serif';
      context.textAlign = 'center';
      context.textBaseline = "middle";

      context.fillText(
        text,
        canvasSize / 2,
        canvasSize / 2,
      )
      const blob = await canvas.convertToBlob()
      this.fallbackSrc = window.URL.createObjectURL(blob)
    }
  }
}
</script>

<style scoped>
.user {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  background-color: #bdbdbd80;
}

.user .n-avatar {
  margin-right: 0.5rem;
}

</style>
