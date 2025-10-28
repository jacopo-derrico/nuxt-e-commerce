import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref('')

  async function fetchProducts() {
    loading.value = true
    error.value = ''
    try {
      const res = await fetch('https://dummyjson.com/products')
      const data = await res.json()
      products.value = data.products
    } catch (e) {
      error.value = 'Failed to fetch products'
    }
    loading.value = false
  }

  async function fetchProduct(id) {
    loading.value = true
    error.value = ''
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`)
      const data = await res.json()
      products.value = data.products
      loading.value = false
      return data
    } catch (e) {
      error.value = 'Failed to fetch product'
      loading.value = false
      throw e
    }
  }

  return { products, loading, error, fetchProducts, fetchProduct }
})