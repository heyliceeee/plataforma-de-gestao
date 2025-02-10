<template>
    <div class="container mt-4">
        <p class="fs-2">📊 Dashboard - Gestao de DPP</p>

        <!-- Cards com estatísticas -->
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <p class="fs-5 card-title">Total de DPPs</p>
                        <p class="fs-3">{{ totalDPPs }}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <p class="fs-5 card-title">Total de DPPs</p>
                        <p class="fs-3">{{ totalDPPs }}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <p class="fs-5 card-title">Total de DPPs</p>
                        <p class="fs-3">{{ totalDPPs }}</p>
                    </div>
                </div>
            </div>
        </div>


        <!-- Gráfico de Status dos DPPs -->
        <div class="mt-4">
            <h4>Status dos DPPs</h4>
            <canvas id="dppChart"></canvas>
        </div>


        <!-- Tabela com Últimos DPPs Criados -->

    </div>
</template>


<script>
import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            totalDPPs: 120,  // Número total de DPPs
            dppsCriadosMes: 15,  // Criados este mês
            dppsExpirados: 5,  // Expirados
            ultimosDPPs: [
                { id: 101, nome: "Produto A", status: "Ativo", dataCriacao: "10/02/2025" },
                { id: 102, nome: "Produto B", status: "Expirado", dataCriacao: "08/02/2025" },
                { id: 103, nome: "Produto C", status: "Pendente", dataCriacao: "07/02/2025" }
            ]
        };
    },
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            const ctx = document.getElementById('dppChart');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Ativo', 'Expirado', 'Pendente'],
                    datasets: [{
                        data: [100, 10, 10],  // Simulando números para cada status
                        backgroundColor: ['#28a745', '#dc3545', '#ffc107']
                    }]
                }
            });
        }
    }
};
</script>