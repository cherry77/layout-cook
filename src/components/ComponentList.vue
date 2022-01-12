<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div
      class="component-item"
      v-for="(item, index) in componentList"
      :key="item.component"
      draggable="true"
      :data-index="index"
    >
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import componentList from './../custom-components/list'

// 这里的dragstart事件时挂在父级上的
const handleDragStart = (e: DragEvent) => {
  e.dataTransfer?.setData('index', e.target?.dataset.index)
}
</script>
<style lang="less" scoped>
.component-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
  .component-item {
    width: 45%;
    border: 1px solid #ddd;
    color: #333;
    padding: 2px 5px;
    cursor: grab;

    display: flex;
    justify-content: center;
    align-items: center;

    &:active {
      cursor: grabbing;
    }
  }
}
</style>