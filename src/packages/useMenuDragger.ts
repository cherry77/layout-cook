export default function useMenuDragger(containerRef, data){
  let currentComponent: any = null
  const dragenter = (e: DragEvent) => {
    e.dataTransfer.dropEffect = 'move'
  }
  const dragover = (e: DragEvent) => {
    // 必须阻止默认事件，否则无法触发drop
    e.preventDefault()
  }
  const dragleave = (e: DragEvent) => {
    e.dataTransfer.dropEffect = 'none';
  }
  const drop = (e: DragEvent) => {
    const blocks = data.value?.blocks
    // 给data赋值会触发computed中的set方法
    data.value = {
      ...data.value,
      blocks: [
        ...blocks,
        {
          key: currentComponent.key,
          top: e.offsetY,
          left: e.offsetX,
          zIndex: 1,
          alignCenter: true
        }
      ]
    }
    currentComponent = null
  }

  const dragstart = (e: DragEvent, component) => {
    // dragenter进入元素中 添加一个移动的标识
    // dragover 在目标元素经过 必须要阻止默认行为 否则不能触发drop
    // dragleave 离开元素的时候 需要增加一个禁用标识
    // drop 松手的时候 根据拖拽的组件 添加一个组件
    containerRef.value.addEventListener('dragenter', dragenter)
    containerRef.value.addEventListener('dragover', dragover)
    containerRef.value.addEventListener('dragleave', dragleave)
    containerRef.value.addEventListener('drop', drop)

    currentComponent = component
  }

  const dragend = (e: DragEvent) => {
    containerRef.value.removeEventListener('dragenter', dragenter)
    containerRef.value.removeEventListener('dragover', dragover)
    containerRef.value.removeEventListener('dragleave', dragleave)
    containerRef.value.removeEventListener('drop', drop)
  }

  return {
    dragstart,
    dragend
  }
}