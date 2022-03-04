import { ref, computed, defineComponent, inject } from 'vue'
import "./../assets/editor.less";
import EditorBlock from './EditorBlock'
import useBlockDragger from './useBlockDragger';
import useFocus from './useFocus';
import useMenuDragger from './useMenuDragger'

export default defineComponent({
  props: {
    modelValue: {
      type: Object
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const config = inject('config')
    const containerStyle = computed(() => {
      return {
        width: data.value?.container.width + 'px',
        height: data.value?.container.height + 'px',
      }
    })
    const data = computed({
      get() {
        return props.modelValue
      },
      set(newValue) {
        ctx.emit('update:modelValue', newValue)
      }
    })

    const containerRef = ref()
    // 1.菜单物料拖拽功能
    const { dragstart, dragend } = useMenuDragger(containerRef, data)
    // 2.实现获取焦点
    const { blockMouseDown, containerMouseDown, focusBlocks } = useFocus(data, (e: MouseEvent) => {
      mousedown(e)
    })
    // 3.实现内部拖拽(单个拖拽，选中多个拖拽)
    const { mousedown } = useBlockDragger(focusBlocks)
    return () => (
      <div class="editor">
        <div class="editor-left">
          {
            config.componentList.map(component => (
              <div class="editor-left-item" draggable
                onDragstart={e => dragstart(e, component)}
                onDragend={e => dragend(e)}>
                <span class="label">{component.label}</span>
                <span>{component.preview()}</span>
              </div>
            ))
          }
        </div>
        <div class="editor-right">right</div>
        <div class="editor-container">
          {/* 产生滚动条 */}
          <div class="editor-container-canvas">
            {/* 内容区域 */}
            <div class="editor-container-canvas__content" style={containerStyle.value} ref={containerRef} onMousedown={e => containerMouseDown(e)}>
              {
                data.value?.blocks.map(block => (
                  <EditorBlock
                    class={block.focus ? 'editor-block-focus' : ''}
                    block={block}
                    onMousedown={e => blockMouseDown(e, block)}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
})