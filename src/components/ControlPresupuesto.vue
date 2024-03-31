<script setup>
    import { CircleProgressBar } from 'circle-progress.vue';
    import { formatAmount } from '../helpers'

    const props = defineProps({
        budget: {
            type: Number,
            required: true
        },
        available: {
            type: Number,
            required: true
        },
        spent: {
            type: Number,
            required: true
        }
    })
    defineEmits(['reset-app'])
</script>

<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">
            <CircleProgressBar
                :value="spent"
                :max="budget"
                :size="250"
                :rounded="true"
                color-filled="var(--rojo)"
                color-unfilled="var(--azul)"
                stroke-width="1rem"
                percentage
                class="progress-texto"
            />
        </div>

        <div class="contenedor-presupuesto">
            <button
                type="button"
                class="reset-app"
                @click="$emit('reset-app')"
            >
                Resetear
            </button>

            <p>
                <span>Presupuesto:</span>
                {{ formatAmount(budget) }}
            </p>

            <p>
                <span>Disponible:</span>
                {{ formatAmount(available) }}
            </p>

            <p>
                <span>Gastado:</span>
                {{ formatAmount(spent) }}
            </p>
        </div>
    </div>
</template>

<style scoped>
    .dos-columnas {
        display: flex;
        flex-direction: column;
    }
    .dos-columnas > :first-child {
        margin-bottom: 3rem;
    }
    @media (min-width: 768px) {
        .dos-columnas {
            flex-direction: row;
            gap: 4rem;
            align-items: center;
        }
        .dos-columnas > :first-child {
            margin-bottom: 0;
        }
    }

    .contenedor-presupuesto {
        width: 100%;
    }
    .contenedor-presupuesto p {
        font-size: 2.4rem;
        text-align: center;
        color: var(--gris-oscuro);
    }
    @media (min-width: 768px) {
        .contenedor-presupuesto p {
            text-align: left;
        }
    }
    .contenedor-presupuesto span {
        font-weight: 900;
        color: var(--azul)
    }

    .reset-app {
        background-color: #DB2777;
        border: none;
        padding: 1rem;
        width: 100%;
        cursor: pointer;
        color: var(--blanco);
        font-weight: 900;
        text-transform: uppercase;
        border-radius: 1rem;
        transition-property: background-color;
        transition-duration: 300ms;

    }
    .reset-app:hover {
        background-color: #c11d67;
    }
    .progress-texto {
        font-size: 3rem;
        font-weight: 900;
        color: var(--gris-oscuro)
    }
</style>