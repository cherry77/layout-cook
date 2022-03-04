<template>
  <Toolbar/>
  <Editor v-model="state"/>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import Editor from './packages/Editor'
import Toolbar from './components/Toolbar.vue'
import data from './data.json'
import { registerConfig as config } from './utils/editor-config'

provide('config', config)
const state = ref(data)

</script>
<style>
</style>