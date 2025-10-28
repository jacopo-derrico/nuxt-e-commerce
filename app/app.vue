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
            :chip="{ // load from store the number of items in cart
              value: 3,
              color: 'primary',
              position: 'top-right'
            }"
          />

        <!-- render if not logged -->
        <UButton 
          v-if="user === null"
          color="primary"
          variant="solid"
          to="/login"
          icon="eva:person-outline"
          aria-label="Login"
        >Login</UButton>
        <!-- render if logged -->
        <UButton 
          v-else
          color="primary"
          variant="solid"
          to="/account"
          aria-label="Login"
        >
        <UAvatar :src="user.image" />{{ user.firstName }}</UButton>

      </template>

      <!-- Mobile navigation drawer -->
      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>

    <UContainer class="mt-2 mb-4">
      <UBreadcrumb v-if="route.path !== '/'" :items="breadcrumb">
        <template #separator>
          <span class="mx-2 text-muted">/</span>
        </template>
      </UBreadcrumb>
    </UContainer>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
      </template>

      <UNavigationMenu :items="footerItems" variant="link" />

      <template #right>
        <UButton
          icon="i-simple-icons-discord"
          color="neutral"
          variant="ghost"
          to="https://go.nuxt.com/discord"
          target="_blank"
          aria-label="Discord"
        />
        <UButton
          icon="i-simple-icons-x"
          color="neutral"
          variant="ghost"
          to="https://go.nuxt.com/x"
          target="_blank"
          aria-label="X"
        />
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/nuxt"
          target="_blank"
          aria-label="GitHub"
        />
      </template>
    </UFooter>
  </UApp>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useLoginStore } from '../stores/login';
  import { storeToRefs } from 'pinia';
  import { useRoute } from 'vue-router';  
  import type { NavigationMenuItem, BreadcrumbItem } from '@nuxt/ui';
  import { chip } from '#build/ui';

  const route = useRoute();

  const userStore = useLoginStore();
  const { user } = storeToRefs(userStore);

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: 'Products',
      to: '/products',
      active: route.path.startsWith('/products')
    }
  ])

  const breadcrumb = computed<BreadcrumbItem[]>(() => {
    const pathSegments = route.path.split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [{ 
      label: 'Home', 
      to: '/',
      active: false // Disable active state for Home
    }];

    if (pathSegments[0] === 'products') {
      crumbs.push({ label: 'Products', to: '/products' });

      if (pathSegments.length > 1) {
        const productIdSegment = pathSegments[1] ?? '';
        if (productIdSegment) {
          const productPath = productIdSegment.split('-');
          const productTitle = productPath.slice(1).join(' ');
          crumbs.push({ label: productTitle.charAt(0).toUpperCase() + productTitle.slice(1), to: `/products/${productIdSegment}` });
        }
      }
    } else if(route.name !== undefined) {
      const currentPage = route.name
      crumbs.push({ label: String(currentPage).charAt(0).toUpperCase() + String(currentPage).slice(1).toLowerCase(), to: route.path });
    }

    return crumbs;
  });

  const footerItems: NavigationMenuItem[] = [
  {
    label: 'Figma Kit',
    to: 'https://go.nuxt.com/figma-ui'
  },
  {
    label: 'Playground',
    to: 'https://stackblitz.com/edit/nuxt-ui',
    target: '_blank'
  },
  {
    label: 'Releases',
    to: 'https://github.com/nuxt/ui/releases',
    target: '_blank'
  }
]
</script>