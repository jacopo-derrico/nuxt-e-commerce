<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <UHeader>
      <template #title>
        <!-- <Logo class="h-6 w-auto" /> -->
        E-commmerce
      </template>

      <UNavigationMenu :items="items"  class="hidden md:flex" />

      <template #right>
        <UColorModeButton />

        <UButton            
          color="neutral"
          variant="ghost"
          to="/cart"
          icon="eva:shopping-cart-outline"
          aria-label="Cart"
          :chip="{
            color: 'primary',
            position: 'top-right'
          }"
        />

      </template>

      <!-- Mobile navigation drawer -->
      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>

    <UBreadcrumb v-if="route.path !== '/'" :items="breadcrumb">
      <template #separator>
        <span class="mx-2 text-muted">/</span>
      </template>
    </UBreadcrumb>

    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';  
  import type { NavigationMenuItem, BreadcrumbItem } from '@nuxt/ui';
import { chip } from '#build/ui';

  const route = useRoute()

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: 'Products',
      to: '/products',
      active: route.path.startsWith('/products')
    }
  ])

  const breadcrumb = computed<BreadcrumbItem[]>(() => {
    const pathSegments = route.path.split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [{ label: 'Home', to: '/' }];

    if (pathSegments[0] === 'products') {
      crumbs.push({ label: 'Products', to: '/products' });

      if (pathSegments.length > 1) {
        const productIdSegment = pathSegments[1];
        const productId = productIdSegment.split('-')[0];
        crumbs.push({ label: `Product ${productId}`, to: `/products/${productIdSegment}` });
      }
    }

    return crumbs;
  });
</script>