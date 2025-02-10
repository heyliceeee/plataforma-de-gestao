<script>
import axios from 'axios';

export default {
    data() {
        return {
            city: "Porto",  // Cidade inicial
            units: "metric",
            apiKey: "3b50c973dfc5621bd70c86847a95fb25",
            weather: {
                cityName: "Porto",
                country: "Portugal",
                temp: "--",
                wind: "--",
                humidity: "--",
                condition: "--"
            }
        };
    },
    mounted() {
        this.fetchWeather();
    },
    methods: {
        async fetchWeather() {
            if (!this.city) return; // Evita pesquisas vazias

            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=${this.units}`
                );

                this.weather.cityName = response.data.name;
                this.weather.country = response.data.sys.country;
                this.weather.temp = response.data.main.temp;
                this.weather.wind = response.data.wind.speed;
                this.weather.humidity = response.data.main.humidity;
                this.weather.condition = response.data.weather[0].description;
            } catch (error) {
                console.error("Erro ao buscar dados climáticos:", error);
                alert("Cidade não encontrada! Tente outra.");
            }
        }
    }
};
</script>

<template>
    <div class="container mt-4">

        <!-- search -->
        <div class="row mt-4">

        </div>

        <p class="fs-2">🌤️ {{ weather.cityName }}, {{ weather.country }}</p>

        <div class="row mt-4">
            <!-- Cartões (Mobile-First) -->
            <div class="col-12 col-md-6 col-lg-3 mb-3">
                <div class="card p-3 text-center">
                    <div class="card-body">
                        <p class="fs-5 card-title">🌡️ Temperature</p>
                        <p class="fs-3">{{ weather.temp }}°C</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-3 mb-3">
                <div class="card p-3 text-center">
                    <div class="card-body">
                        <p class="fs-5 card-title">💨 Wind</p>
                        <p class="fs-3">{{ weather.wind }}km/h</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-3 mb-3">
                <div class="card p-3 text-center">
                    <div class="card-body">
                        <p class="fs-5 card-title">💧 Humidity</p>
                        <p class="fs-3">{{ weather.humidity }}%</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-3 mb-3">
                <div class="card p-3 text-center">
                    <div class="card-body">
                        <p class="fs-5 card-title">☁️ Condition</p>
                        <p class="fs-3">{{ weather.condition }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>