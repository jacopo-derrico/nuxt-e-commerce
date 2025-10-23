<template>
  <div>
    <UContainer>
      <UButton to="/">Back to Products</UButton>
      <ULoading v-if="loading" />
      <UAlert v-if="error" color="red">{{ error }}</UAlert>
      <UCard v-if="product">
        <h1>{{ product.title }}</h1>
        <p>{{ product.description }}</p>
        <p>{{ product.price }} $</p>
        <UButton @click="addToCart(product)">Add to Cart</UButton>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const product = ref(null)
const loading = ref(false)
const error = ref('')

// Extract the ID from the slug (e.g., "3-fancy-shoes" => 3)
function getIdFromSlug(slug) {
  return slug.split('-')[0]
}

onMounted(async () => {
  loading.value = true
  try {
    const id = getIdFromSlug(route.params.slug)
    product.value = await productsStore.fetchProduct(id)
  } catch (e) {
    error.value = 'Product not found'
  }
  loading.value = false
})

function addToCart(product) {
  cartStore.add(product)
}
</script>