<script setup>
import Header from '@/components/Header.vue'
import {NMessageProvider} from 'naive-ui'</script>

<template>
  <n-message-provider>
    <Header></Header>
    <router-view></router-view>
    <footer></footer>
  </n-message-provider>
</template>

<style></style>
