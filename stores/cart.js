import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  function add(product) {
    if (!items.value.find(i => i.id === product)) {
      items.value.push(product)
    }
  }

  function remove(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, add, remove, clear }
})