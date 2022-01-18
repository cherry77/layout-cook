<template>
  <div id="editor" >
    <component
      v-for="item in components"
      :key="item.name"
      :is="item.component"
      :prop-value="item.propValue"
      :style="item.style"
    />
    <button ref="btnRef" @mousedown="handleMousedown" style="position: absolute">动起来</button>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
const components = computed(() => appStore.getComponents)

const btnRef = ref()
const handleMousedown = (e: MouseEvent) => {
  const startX = e.clientX
  const startY = e.clientY

  const startTop = parseInt(btnRef.value.style.top || 0)
  const startLeft = parseInt(btnRef.value.style.left || 0)

  const rectInfo: DOMRect = document.getElementById('editor')?.getBoundingClientRect()
  const compRectInfo: DOMRect = btnRef.value?.getBoundingClientRect()

  const move = (moveEvent: MouseEvent) => {
    let endTop = moveEvent.clientY - startY + startTop 
    let endLeft = moveEvent.clientX - startX + startLeft 

    // 判断边界
    if(endTop < 0) endTop = 0
    if(endLeft < 0) endLeft = 0
    if(endTop > (rectInfo?.height - compRectInfo.height)) 
      endTop = rectInfo?.height - compRectInfo.height

    if(endLeft > (rectInfo?.width - compRectInfo.width)) 
      endLeft = rectInfo?.width - compRectInfo.width

    btnRef.value.style.top = endTop + 'px'
    btnRef.value.style.left = endLeft + 'px'
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