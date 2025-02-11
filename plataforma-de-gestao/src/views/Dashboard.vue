<script>
import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            searchCount: JSON.parse(localStorage.getItem("citySearchCount")) || {},
            totalSearches: 0,
            mostSearchedCity: "--",
            topCities: [],
            uniqueCitiesPercentage: 0,
        };
    },
    mounted() {
        this.calculateStats();
        this.renderCharts();
    },
    methods: {
        calculateStats() {
            let searches = this.searchCount;
            let total = Object.values(searches).reduce((a, b) => a + b, 0);
            let sortedCities = Object.entries(searches)
                .sort((a, b) => b[1] - a[1])
                .map(([name, count]) => ({ name, count }));

            this.totalSearches = total;
            this.mostSearchedCity = sortedCities.length > 0 ? sortedCities[0].name : "--";
            this.topCities = sortedCities.slice(0, 5);
            this.uniqueCitiesPercentage = sortedCities.length > 0 ? ((sortedCities.length / total) * 100).toFixed(1) : 0;
        },

        renderCharts() {
            const ctxBar = document.getElementById('barChart');
            const ctxPie = document.getElementById('pieChart');

            if (!ctxBar || !ctxPie) return;

            const cityLabels = Object.keys(this.searchCount);
            const cityCounts = Object.values(this.searchCount);

            // Gráfico de Barras
            new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: cityLabels,
                    datasets: [{
                        label: 'Pesquisas por Cidade',
                        data: cityCounts,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    }]
                }
            });

            // Gráfico de Pizza
            new Chart(ctxPie, {
                type: 'pie',
                data: {
                    labels: cityLabels,
                    datasets: [{
                        data: cityCounts,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                    }]
                },
                options: {
                    maintainAspectRatio: false, // Permite controlar o tamanho
                    responsive: true
                }
            });
        }
    }
};
</script>

<template>
    <div class="container mt-4">
        <!-- Cards -->
        <div class="row mt-4">
            <div class="col-12 col-md-6 col-lg-3 mb-3">
                <div class="card p-3 text-center">
                    <div class="card-body">
                        <p class="fs-5 card-title">🔎 Total Searches</p>
                        <p class="fs-3">{{ totalSearches }}</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-3 mb-3">
                <div class="card p-3 text-center">
                    <div class="card-body">
                        <p class="fs-5 card-title">🌍 Most Searched City</p>
                        <p class="fs-3">{{ mostSearchedCity }}</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-3 mb-3">
                <div class="card p-3 text-center">
                    <div class="card-body">
                        <p class="fs-5 card-title">🔝 5 Cities</p>
                        <ul class="list-unstyled">
                            <li v-for="(city, index) in topCities" :key="index">{{ city.name }} ({{ city.count }}x)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-3 mb-3">
                <div class="card p-3 text-center">
                    <div class="card-body">
                        <p class="fs-5 card-title">🌍 Percentage of Unique Cities</p>
                        <p class="fs-3">{{ uniqueCitiesPercentage }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Gráfico de Barras -->
        <div class="mt-4">
            <p class="fs-4 mt-3">📊 Search Frequency</p>
            <canvas id="barChart"></canvas>
        </div>

        <!-- Gráfico de Pizza -->
        <div class="mt-5">
            <p class="fs-4 mt-3">🗂️ Distribution of Research</p>
            <div>
                <canvas id="pieChart"></canvas>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>