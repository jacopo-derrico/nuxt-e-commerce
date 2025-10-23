<template>
  <div>
    <UContainer>
      <h1>Your Cart</h1>
      <UAlert v-if="cart.length === 0">Cart is empty</UAlert>
      <UCard v-for="item in cart" :key="item.id" class="mb-4">
        <h2>{{ item.title }}</h2>
        <p>{{ item.price }} $</p>
        <UButton @click="remove(item.id)">Remove</UButton>
      </UCard>
      <div v-if="cart.length">
        <p>Total: {{ total }} $</p>
        <UButton>Checkout</UButton>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const cart = computed(() => cartStore.items)
const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price, 0)
)

function remove(id) {
  cartStore.remove(id)
}
</script>