import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    componentData: []
  }),
  getters: {
    getComponents (state) {
      return state.componentData
    }
  },
  actions: {
    addComponent (component) {
      this.componentData.push(component)
    }
  }
})