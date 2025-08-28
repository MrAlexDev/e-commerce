import { ref } from 'vue'

const toasts = ref([])

export function useToasts() {
  function push(message, type = 'info', durationMs = 3000) {
    const id = Date.now() + Math.random()
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      const idx = toasts.value.findIndex(t => t.id === id)
      if (idx !== -1) toasts.value.splice(idx, 1)
    }, durationMs)
  }

  return { toasts, push }
}



