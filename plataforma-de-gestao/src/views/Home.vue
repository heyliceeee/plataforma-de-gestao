<script>
import axios from 'axios';

export default {
    data() {
        return {
            city: localStorage.getItem("lastCity") || "Portugal",  // Carrega a última cidade pesquisada ou usa "Portugal"
            units: "metric",
            apiKey: "3b50c973dfc5621bd70c86847a95fb25",
            weather: {
                cityName: "--",
                country: "--",
                temp: "--",
                wind: "--",
                humidity: "--",
                condition: "--",
                icon: "",
                iconUrl: ""
            },
            forecast: [], // Lista original para armazenar a previsão dos próximos 5 dias
            groupedForecast: [] // Lista processada para o carrossel
        };
    },
    mounted() {
        this.fetchWeather();
        window.addEventListener("resize", this.updateGrouping);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateGrouping);
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
                this.weather.icon = response.data.weather[0].icon;
                this.weather.iconUrl = `https://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;

                localStorage.setItem("lastCity", this.city); // guarda a cidade no LocalStorage

                // Salvar no histórico (evitar duplicatas)
                let history = JSON.parse(localStorage.getItem("cityHistory")) || [];

                if (!history.includes(this.city)) {
                    history.unshift(this.city); // Adiciona no início do array
                    
                    if (history.length > 5) history.pop(); // Mantém apenas as últimas 5 cidades
                    localStorage.setItem("cityHistory", JSON.stringify(history));
                }

                // Buscar previsão de 5 dias
                this.fetchForecast();

            } catch (error) {
                console.error("Error fetching climate data:", error);
                alert("City not found! Try another one.");
            }
        },

        async fetchForecast() {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.apiKey}&units=${this.units}`
                );

                // Filtrar dados para pegar 1 previsão por dia (12:00 UTC)
                const filteredData = response.data.list.filter(item => item.dt_txt.includes("12:00:00"));

                // Transformar os dados em um formato mais limpo
                this.forecast = filteredData.map(item => ({
                    date: new Date(item.dt_txt).toLocaleDateString("en", { weekday: "short", day: "numeric", month: "short" }),
                    temp: item.main.temp,
                    description: item.weather[0].description,
                    iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                }));

                this.updateGrouping(); // Atualiza a exibição conforme a tela

            } catch (error) {
                console.error("Erro ao buscar previsão do tempo:", error);
            }
        },

        updateGrouping() {
            let cardsPerSlide = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 4;
            this.groupedForecast = [];

            for (let i = 0; i < this.forecast.length; i += cardsPerSlide) {
                this.groupedForecast.push(this.forecast.slice(i, i + cardsPerSlide));
            }
        }
    }
};
</script>

<template>
    <div class="container mt-4">

        <!-- search -->
        <div class="row mt-4">
            <div class="d-flex" role="search">
                <input class="form-control me-2" v-model="city" @keyup.enter="fetchWeather" type="search"
                    placeholder="🔍 Type the city and press Enter" aria-label="Search">
                <button class="btn btn-outline-success" type="submit" @click="fetchWeather">Search</button>
            </div>
        </div>

        <!-- selected city -->
        <p class="fs-2 mt-3">🌤️ {{ weather.cityName }}, {{ weather.country }}</p>

        <!-- Cards -->
        <div class="row mt-4">
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

           <!-- Cartão atualizado com o ícone dinâmico do clima -->
           <div class="col-12 col-md-6 col-lg-3 mb-3">
                <div class="card p-3 text-center">
                    <div class="card-body">
                        <p class="fs-5 card-title">☁️ Condition</p>

                        <div class="d-flex align-items-center justify-content-center">
                            <img v-if="weather.icon" :src="weather.iconUrl" :alt="weather.condition" class="weather-icon">
                            <p class="fs-3">{{ weather.condition }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Previsao para os proximos 5 dias -->
        <div class="container mt-4">
            <p class="fs-3 mt-4 text-center">📅 Forecast for the next 5 days</p>

            <!-- Carrossel de Previsão do Tempo -->
            <div class="carousel slide" id="carousel-forecast" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div v-for="(group, index) in groupedForecast" :key="index" class="carousel-item" :class="{ active: index === 0 }">
                        <div class="row mt-4">
                            <div v-for="(day, idx) in group" :key="idx" class="col-12 col-md-6 col-lg-3 mb-3">
                                <div class="card text-center p-3">
                                    <p class="fs-5 card-title">{{ day.date }}</p>
                                    <p class="fs-3">{{ day.temp }}°C</p>

                                    <div class="d-flex align-items-center justify-content-center">
                                        <img :src="day.iconUrl" :alt="day.description" class="weather-icon-5days">
                                        <p class="text-muted fs-5">{{ day.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Controles do Carrossel -->
                <button class="carousel-control-prev carousel-control-custom" type="button" data-bs-target="#carousel-forecast" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next carousel-control-custom
                
                " type="button" data-bs-target="#carousel-forecast" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.weather-icon {
    width: 40px;
    height: 40px;
}

.weather-icon-5days {
    width: 35px;
    height: 35px;
}

/* Personalização dos botões do carrossel */
.carousel-control-custom {
    background-color: rgba(248, 249, 250, 0.5); /* Cinza com transparência */
    border-radius: 5px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Alinhar verticalmente ao centro */
    top: 50%;
    transform: translateY(-50%);
}

/* Garante que os ícones internos fiquem visíveis */
.carousel-control-prev-icon,
.carousel-control-next-icon {
    filter: invert(1); /* Inverte a cor para manter os ícones visíveis */
}
</style>