<script>
import axios from 'axios';

export default {
    data() {
        return {
            history: JSON.parse(localStorage.getItem("cityHistory")) || []
        };
    },
    methods: {
        selectCity(city) {
            localStorage.setItem("lastCity", city);
            this.$router.push("/"); // Redireciona para a página Home para carregar o clima
        },
        clearHistory() {
            localStorage.removeItem("cityHistory");
            this.history = [];
        }
    }
};
</script>

<template>
    <div class="container mt-4">
        <h2>📜 Search History</h2>

        <ul class="list-group mt-3">
            <li v-for="(city, index) in history" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                <span @click="selectCity(city)" class="city-name">{{ city }}</span>
                <button class="btn btn-sm btn-primary" @click="selectCity(city)">🔄 See Weather</button>
            </li>
        </ul>

        <button class="btn btn-danger mt-3" @click="clearHistory">🗑️ Clear History</button>
    </div>
</template>

<style scoped>
.city-name {
    cursor: pointer;
    text-decoration: underline;
}
.city-name:hover {
    color: blue;
}
</style>