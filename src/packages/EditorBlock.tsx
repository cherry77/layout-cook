import { computed, defineComponent, inject, onMounted, ref } from 'vue';

export default defineComponent({
  props: {
    block: {
      type: Object
    }
  },
  setup (props) {
    const config = inject('config')
    const component = config.componentMap[props.block.key]
    const RenderComponent = component.render()
    const blockStyle = computed(() => {
      return {
        top: props.block.top + 'px',
        left: props.block.left + 'px'
      }
    })

    // 拖过来的时候居中处理，否则鼠标在左上角(至于等待渲染完成后知道宽高)
    const blockRef = ref()
    // dom加载完的时候处理
    onMounted(() => {
      if(props.block.alignCenter){
        // 直接改props了，原则上需要emit
        props.block.left = props.block.left - blockRef.value.offsetWidth / 2
        props.block.top = props.block.top - blockRef.value.offsetHeight / 2
        props.block.alignCenter = false
      }
    })
    return () => (
      <div class="editor-block" style={blockStyle.value} ref={blockRef}>
        { RenderComponent }
      </div>
    )
  }
})