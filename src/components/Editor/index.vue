<template>
  <div id="editor" @mousedown="handleMousedown">
    <component
      v-for="item in components"
      :key="item.component"
      :is="item.component"
      :prop-value="item.propValue"
      :style="item.style"
    />
    <button ref="btnRef" style="position: absolute">动起来</button>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
const components = computed(() => appStore.getComponents)

// const getComponentStyle = (style) => {

// }
const state = reactive({
  startX: null,
  startY: null,
})
const btnRef = ref()


const handleMousedown = (e: MouseEvent) => {
  const startX = e.clientX
  const startY = e.clientY
  console.log(startX, startY)

  const move = (moveEvent: MouseEvent) => {
    btnRef.value.style.top = moveEvent.clientY - startY + 'px'
    btnRef.value.style.left = moveEvent.clientX - startX + 'px'

    console.log(btnRef.value.style.top, btnRef.value.style.left)
  }

  const up = (upEvent: MouseEvent) => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }
  
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
</script>
<style>
#editor {
  position: relative;
  width: 1200px;
  height: 740px;
  background-color: bisque;
}
</style>