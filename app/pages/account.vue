<template>
    <div>
        <UContainer class="mt-10">
            <h1 class="text-2xl font-bold mb-6">Account Details</h1>
            <div v-if="user !== null" class="space-y-4">
                <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Username:</strong> {{ user.username }}</p>
                <p v-if="user.address"><strong>Address:</strong> {{ user.address }}</p>
                <p v-if="user.phone"><strong>Phone:</strong> {{ user.phone }}</p>
                <UButton @click="logout" color="red">Logout</UButton>
            </div>
            <div v-else class="text-gray-600">
                <p>You are not logged in. <a href="/login" class="text-blue-600 hover:underline">Login here</a></p>
            </div>
        </UContainer>
    </div>
</template>

<script setup>
    import { useLoginStore } from '../../stores/login'
    import { storeToRefs } from 'pinia'
    import { useRouter } from 'vue-router'

    const userStore = useLoginStore()
    const router = useRouter()
    const { user } = storeToRefs(userStore)

    function logout() {
        userStore.logout()
        router.push('/login')
    }
</script>