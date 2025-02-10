<template>
    <div>
        <h2>👤 Gestão de Utilizadores</h2>
        <p>Aqui poderás adicionar, editar ou excluir utilizadores.</p>
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