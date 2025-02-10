<template>
    <div>
        <h2>📦 Gestão de Produtos</h2>
        <p>Lista e controle de produtos do sistema.</p>
    </div>
</template>


<script>
export default {
    data() {
        return {
            dpps: [
                { id: 1, nome: "Produto A", status: "Ativo" },
                { id: 2, nome: "Produto B", status: "Inativo" }
            ]
        };
    }
};
</script>