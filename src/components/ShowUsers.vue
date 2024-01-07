<!-- דף זה לא בשימוש מכיוון שיש את תצוגת הטבלה -->

<template>
    <div>
        <h1>Users</h1>
        <div v-for="user in users" :key="user.id">
            <h2>{{ user.userFirstName }} {{ user.userLastName }}</h2>
            <p>{{ user.userPhone }}</p>
            <p>{{ user.userEmail }}</p>
            <p>{{ user.userCity }}</p>
            <p>{{ user.userAddress }}</p>
            <p>{{ user.userContact }}</p>
            <p>{{ user.userScore }}</p>
            <p>{{ user.userLevel }}</p>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
const users = ref([])

const fetchUsers = async () => {
    const response = await fetch(process.env.VUE_APP_URL_SERVER + "/users",
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
    console.log(response);
    users.value = await response.json()
    console.log(users.value)
}

fetchUsers()

</script> 