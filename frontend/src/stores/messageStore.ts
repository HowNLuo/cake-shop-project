import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [] as { id: number; text: string; type: 'success' | 'error' | 'warning' }[],
  }),
  actions: {
    show(text: string, type: 'success' | 'error' | 'warning' = 'success') {
      const id = Date.now()
      this.messages.push({ id, text, type })

      setTimeout(() => {
        this.messages = this.messages.filter((msg) => msg.id !== id)
      }, 3000)
    },
  },
})
