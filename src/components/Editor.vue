<template>
  <div id="editor">
    <component
      v-for="item in components"
      :key="item.component"
      :is="item.component"
      :prop-value="item.propValue"
      :style="getComponentStyle(item.style)"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
const visualStore = useAppStore()
const components = computed(() => visualStore.getComponents)
</script>
<style>
#editor {
  position: relative;
  width: 1200px;
  height: 740px;
  background-color: bisque;
}
</style>