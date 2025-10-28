<template>
  <div class="max-w-(--ui-container) mx-auto py-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Products</h1>
    <input
      v-model="search"
      placeholder="Search by title..."
      class="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <div v-if="loading" class="text-blue-600 mb-4">Loading...</div>
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>
    <UPageGrid>
      <UPageCard
        v-for="product in filteredProducts"
        :key="product.id"
        :title="product.title"
        :description="product.description"
        :to="`/products/${product.id}-${titleToSlug(product.title)}`"
        :ui="{
          body: 'flex flex-col justify-between h-full',
          footer: 'w-full'
        }"
        spotlight
        class="[--spotlight-color:blue]"
      >
        <template #header>
            <h2 class="text-xl font-semibold line-clamp-2">{{ product.title }}</h2>
        </template>

        <template #body>
            <figure class="aspect-square w-full flex items-center justify-center overflow-hidden p-4 max-h-50">
                <img class="h-full" :src="product.images[0]" :alt="product.title">
            </figure>
        </template>

        <template #footer>
          <div class="flex items-center justify-between mt-4">
            <span class="text-lg font-semibold">{{ product.price }} $</span>
            <UButton
              @click="addToCart(product)"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-900 transition"
            >
              Add to Cart
            </UButton>
          </div>
        </template>
      </UPageCard>
    </UPageGrid>
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

const appConfig = useAppConfig()

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