<template>
  <div class="toolbar">
    <Button>撤销</Button>
    <Button>重做</Button>
    <Button>插入图片</Button>
    <Button>预览</Button>
    <Button>保存</Button>
  </div>
</template>
<script lang="ts" setup>
import { Button } from 'ant-design-vue'
</script>
<style lang="less">
  .toolbar{
    padding: 15px 10px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    height: 64px;
    .ant-btn{
      font-size: 12px;
      margin-left: 8px;
    }
  }
</style>