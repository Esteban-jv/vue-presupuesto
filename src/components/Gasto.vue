<script setup>
import { formatAmount, formatDate } from '../helpers';
import IconoAhorro from '../assets/img/icono_ahorro.svg'
import IconoCasa from '../assets/img/icono_casa.svg'
import IconoComida from '../assets/img/icono_comida.svg'
import IconoGastos from '../assets/img/icono_gastos.svg'
import IconoOcio from '../assets/img/icono_ocio.svg'
import IconoSalud from '../assets/img/icono_salud.svg'
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'

    const diccionarioIconos = {
        ahorro : IconoAhorro,
        comida : IconoComida,
        casa : IconoCasa,
        gastos : IconoGastos,
        ocio : IconoOcio,
        salud : IconoSalud,
        suscripciones : IconoSuscripciones
    }

    const props = defineProps({
        expense: {
            type: Object,
            required: true
        }
    })

    defineEmits(['select-expense'])
</script>

<template>
    <div class="gasto sombra">
        <div class="contenido">
            <img
                :src="diccionarioIconos[expense.category]"
                alt="Ícono gasto"
                class="icono"
            />

            <div class="detalles">
                <p class="categoria">{{ expense.category }}</p>
                <p
                    class="nombre"
                    @click="$emit('select-expense',expense.id)"
                >{{ expense.name }}</p>

                <p class="fecha">Fecha: {{ formatDate(expense.date) }}</p>
            </div>
        </div>

        <p class="cantidad">
            <span>{{ formatAmount(expense.amount) }}</span>
        </p>
    </div>
</template>

<style scoped>
    .gasto {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    .contenido {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    .icono {
        width: 5rem;
    }
    .detalles p {
        margin: 0 0 1rem 0;
    }
    .categoria {
        color: var(--gris);
        font-size: 1.2rem;
        text-transform: uppercase;
        font-weight: 900;
    }
    .nombre {
        color: var(--gris-oscuro);
        font-size: 2.4rem;
        font-weight: 700;
        cursor: pointer;
    }
    .fecha {
        font-size: 1.6rem;
        font-weight: 900;
        color: var(--gris-oscuro);
    }
    .fecha span{
        font-weight: 400;
    }
    .cantidad {
        font-size: 3rem;
        font-weight: 900;
        margin: 0;
    }
</style>