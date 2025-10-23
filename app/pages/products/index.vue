<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Products</h1>
    <input
      v-model="search"
      placeholder="Search by title..."
      class="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <div v-if="loading" class="text-blue-600 mb-4">Loading...</div>
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>
    <div
      v-for="product in filteredProducts"
      :key="product.id"
      class="border border-gray-200 rounded-lg shadow-sm p-6 mb-6 flex flex-col md:flex-row items-center justify-between"
    >
      <div>
        <h2 class="text-xl font-semibold mb-2">{{ product.title }}</h2>
        <p class="text-lg text-gray-700 mb-2">{{ product.price }} $</p>
        <a
          :href="`/products/${product.id}-${titleToSlug(product.title)}`"
          class="text-blue-600 hover:underline text-sm"
        >
          View
        </a>
      </div>
      <button
        @click="addToCart(product)"
        class="mt-4 md:mt-0 md:ml-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
    <div v-if="filteredProducts.length === 0 && !loading" class="text-gray-500 text-center mt-10">
      No products found.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

// fetch products
const productsStore = useProductsStore()
productsStore.fetchProducts()

const { products, loading, error } = storeToRefs(productsStore)
const cartStore = useCartStore()
const search = ref('')

const filteredProducts = computed(() =>
  products.value.filter(p =>
    p.title.toLowerCase().includes(search.value.toLowerCase())
  )
)

function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function addToCart(product) {
  cartStore.add(product)
}
</script>