<template>
  <Toolbar/>
  <main>
    <section class="left">
      <ComponentList />
    </section>
    <section class="center">
      <div class="content" @dragover="handleDragover" @drop="handleDrop">
        <Editor ref="editorRef"/>
      </div>
    </section>
    <section class="right"></section>
  </main>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Toolbar from '@/components/Toolbar.vue'
import ComponentList from '@/components/ComponentList.vue'
import Editor from '@/components/Editor/index.vue'
import componentList from '@/custom-components/list'
import { useAppStore } from '@/store/modules/app'
import { cloneDeep } from 'lodash-es';

const editorRef = ref()

const visialStore = useAppStore()
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  const index = e.dataTransfer?.getData('index')
  const component = cloneDeep(componentList[index])
  if(component){
    const rect: DOMRect = document.getElementById('editor')?.getBoundingClientRect()
    component.style.top = e.clientY - rect.y
    component.style.left = e.clientX - rect.x
    visialStore.addComponent(component)
  }
}

const handleDragover = (e: DragEvent) => {
  e.preventDefault()
}


</script>
<style lang="less">
  main{
    position: relative;
    width: 100%;
    height: calc(100% - 64px);
    .left{
      width: 200px;
      height: 100%;
      background-color: #fff;
      position: absolute;
      top: 0;
      left: 0
    }
    .center{
      margin-left: 200px;
      margin-right: 262px;
      background-color: #f5f5f5;
      height: 100%;
      padding: 20px;
      overflow: auto; // bfc
      .content{
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
    .right{
      width: 262px;
      height: 100%;
      background-color: #fff;
      position: absolute;
      top: 0;
      right: 0
    }
  }
</style>