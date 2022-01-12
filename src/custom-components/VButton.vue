<template>
  <button class="v-button">{{ propValue }}</button>
</template>
<script lang="ts" setup>
defineProps({
  propValue: {
      type: String,
      default: '',
  },
  element: {
      type: Object,
      default: () => {},
  },
})
</script>
<style lang="less" scoped>
  /* line-height：1 ，相当于line-height：100%，会根据该元素本身的字体大小设置行高，比如字体大小是15px，行高就是15px。
  line-height：1.5，相当于line-height：150%；
  line-height：0.5，相当于line-height：50%。 */
  .v-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    width: 100%;
    height: 100%;
    font-size: 14px;

    &:active {
        color: #3a8ee6;
        border-color: #3a8ee6;
        outline: 0;
    }

    &:hover {
        background-color: #ecf5ff;
        color: #3a8ee6;
    }
}
</style>