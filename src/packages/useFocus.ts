import {computed } from 'vue'
/**
 * 
 * @param data 
 * @param callback 选中一个后就回调
 * @returns 
 */
export default function useFocus(data, callback){
  // 清除焦点样式
  const cleatBlocksFocus = () => {
    data.value.blocks.forEach(block => block.focus = false)
  }
  // 实现获取焦点 block上挂一个focus属性判断是否获取焦点
  const blockMouseDown = (e: MouseEvent, block) => {
    e.preventDefault()
    e.stopPropagation()
    // 按住ctrl可选中多个
    if (e.ctrlKey) {
      block.focus = !block.focus
    } else {
      if (!block.focus) {
        cleatBlocksFocus()
        block.focus = true 
      } // 当自己已经被选中了，在次点击时还是选中状态
    }
    callback(e)
  }
  const focusBlocks = computed(() => {
    const focus: any = []
    const unfocus: any = []
    data.value.blocks.forEach(block => (block.focus ? focus : unfocus).push(block))
    return { focus, unfocus }
  })

  const containerMouseDown = (e: MouseEvent) => {
    cleatBlocksFocus()
  }

  return {
    blockMouseDown,
    containerMouseDown,
    focusBlocks
  }
}