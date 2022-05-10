<template>
  <div v-if="currentMotion.id > 0" class="vote-page">
    <h2>{{ currentMotion.name }}</h2>
    <div class="author">{{ getUsername(currentMotion.userID) }}</div>
    <div class="description">{{ currentMotion.description }}</div>
    <div class="boxes larger">
      <div
        v-for="(type, i) in ['for', 'against']"
        :key="i" :style="{
          '--color':backgroundColors[i],
          '--image': resolved(i) ? backgroundImages[i] : '',
        }"
        class="box color"
      >
        <strong class="number">{{ currentMotion[type].length }}</strong>
        <div v-for="(id, j) in currentMotion[type]" :key="j">
          {{ getUsername(id) }}
        </div>
      </div>
    </div>
    <div class="abstain larger">
      <div v-for="(id, j) in currentMotion.abstain" :key="j" class="name">
        {{ getUsername(id) }}
      </div>
    </div>
  </div>
  <div v-else class="vote-page">
  </div>
</template>

<script>
import {mapState} from "vuex"
import {getUser} from "@/utils";

export default {
  name: "VotePage",
  data() {
    return {
      backgroundColors: ['#388E3C', '#D32F2F'],
      backgroundImages: ['url(/img/passed.png)', 'url(/img/failed.png)']
    }
  },
  computed: {
    ...mapState(['currentMotion']),
  },
  methods: {
    getUsername(id) {
      return getUser(id).name
    },
    resolved(i) {  // 当前区域为确认状态
      if (i === 0) {
        return this.currentMotion.status === 1
      } else {
        return this.currentMotion.status === -1
      }
    }
  }
}
</script>

<style scoped>
.vote-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
}

h2 {
  margin-bottom: 0;
}

.author {
  font-style: italic;
}

.description {
  margin: 0.5rem 0;
}

.boxes {
  display: flex;
  width: 100%;
  min-height: 16rem;
  margin-top: 1rem;
}

.box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.color {
  cursor: pointer;
  position: relative;
  --color: transparent;
  --opacity: 0.25;
  --image: "";

}

.color:hover {
  border: 2px solid var(--color);
  --opacity: 0.5;
}

.color::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: var(--color);
  opacity: var(--opacity);
}

.color::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: var(--image);
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: var(--opacity);
}

.number {
  padding: 0.5em 0;
}

.abstain {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 2em;
  width: 100%;
  background-color: #61616160;
}

.abstain .name {
  margin: 0 0.5em;
}
</style>
