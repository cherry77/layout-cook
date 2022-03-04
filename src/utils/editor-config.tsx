// 左侧列表显示所有的物料
// key对应的组件映射关系

import { Button, Input } from 'ant-design-vue'
function createEditorConfig(){
  // 所有组件：用于渲染左侧
  const componentList: any = []
  // key与组件的映射关系：用于渲染content
  const componentMap:any = {}

  return {
    componentList,
    componentMap,
    register: (component: any) => {
      componentList.push(component)
      componentMap[component.key] = component
    }
  }
}

// 导出后就有componentList和componentMap了
export const registerConfig = createEditorConfig()

registerConfig.register({
  label: '文本',
  key: 'text',
  preview: () => '预览文本',
  render: () => '渲染文本'
})

registerConfig.register({
  label: '按钮',
  key: 'button',
  preview: () => <Button>预览按钮</Button>,
  render: () => <Button>渲染按钮</Button>
})

registerConfig.register({
  label: '输入框',
  key: 'input',
  preview: () => <Input placeholder="预览输入框">预览按钮</Input>,
  render: () => <Input placeholder="渲染输入框">预览按钮</Input>
})