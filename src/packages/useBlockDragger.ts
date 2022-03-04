export default function useBlockDragger (focusBlocks) {
  let dragState = {
    startX: 0,
    startY: 0,
    startPos: {}
  }
  const mousemove = (e: MouseEvent) => {
    const { clientX: moveX, clientY: moveY } = e
    const durX = moveX - dragState.startX
    const durY = moveY - dragState.startY

    focusBlocks.value.focus.forEach((block, index) => {
      block.left = dragState.startPos[index].left + durX
      block.top = dragState.startPos[index].top + durY
    })
  }
  const mouseup = (e: MouseEvent) => {
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }
  const mousedown = (e: MouseEvent) => {
    dragState = {
      startX: e.clientX,// 当前按下的位置
      startY: e.clientY,
      startPos: focusBlocks.value.focus.map(({top, left}) => ({top, left})) // 记录每一个选中的位置
    }
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
  }

  return {
    mousedown
  }
}