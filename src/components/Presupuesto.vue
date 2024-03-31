<script setup>
    import { ref } from 'vue'
    import Alerta from './Alerta.vue'

    const budget = ref(0)
    const error = ref('')

    const emit = defineEmits(['set-budget'])

    const defineBudget = () => {
        if(budget.value <= 0 && budget.value === '') {
            error.value = 'Presupuesto no válido'

            setTimeout(()=> {
                error.value = ''
            }, 3000)

            return
        }

        emit('set-budget',budget.value);
    }
</script>

<template>
    <form
        class="presupuesto"
        @submit.prevent="defineBudget"
        >

        <Alerta v-if="error">
            {{ error }}
        </Alerta>

        <div class="campo">
            <label for="new-budget">Definir Presupuesto</label>

            <input 
                type="number"
                id="new-budget"
                class="nuevo-presupuesto"
                placeholder="Añade tu presupuesto"
                min="0"
                v-model.number="budget"
            >
        </div>
        <input type="submit" value="Definir Presupuesto">
    </form>
</template>

<style scoped>
    .presupuesto {
        width: 100%;
    }
    .campo {
        display: grid;
        gap: 2rem;
    }
    .presupuesto label {
        font-size: 2.2rem;
        text-align: center;
        color: var(--azul);
    }
    .presupuesto input[type="number"] {
        background-color: var(--gris-claro);
        border-radius: 1rem;
        padding: 1rem;
        border: none;
        font-size: 2.2rem;
        text-align: center;
    }
    .presupuesto input[type="submit"] {
        background-color: var(--azul);
        padding: 1rem;
        border: none;
        font-size: 2rem;
        text-align: center;
        margin-top: 2rem;
        color: var(--blanco);
        font-weight: 900;
        width: 100%;
        transition: background-color 300ms ease;
    }
    .presupuesto input[type="submit"]:hover {
        background-color: #1048A4;
        cursor: pointer;
    }
</style>