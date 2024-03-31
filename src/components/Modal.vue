<script setup>
    import { ref, computed } from 'vue'

    import Alerta from './Alerta.vue';
    import closeModal from '../assets/img/cerrar.svg'

    const error = ref('')

    const emit = defineEmits([
            'hide-modal',
            'save-spent',
            'delete-expense',
            'update:name',
            'update:amount',
            'update:category',
        ])

    const props = defineProps({
        modal: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        amount: {
            type: [String, Number],
            required: true
        },
        category: {
            type: String,
            required: true
        },
        available: {
            type: Number,
            required: true
        },
        id: {
            type: [String, null],
            required: true
        }
    })

    const oldAmount = props.amount

    const addSpent = () => {
        const { amount, category, name, available, id } = props;
        if([name, amount, category].includes('')) {
            error.value = 'Todos los campos son obligatorios'
            return cleanError(2000)
        }
        
        if(amount <= 0) {
            error.value = 'Cantidad no válida'
            return cleanError(2000)
        }

        // Validar que no se pueda gastar más de lo disponible
        if(id) {
            // Tomar en cuenta el gasto ya realizado
            if(amount > oldAmount + available) {
                error.value = 'El nuevo valor excede el presupuesto'
                return cleanError(2000)
            }
        } else {
            if(amount > available) {
                error.value = 'El valor excede el presupuesto'
                return cleanError(2000)
            }
        }

        emit('save-spent');
    }

    const cleanError = delayTime => {
        setTimeout( () => error.value = '', delayTime )
    }

    const actionText = computed( () => {
        return props.id ? 'Modificar' : 'Añadir'
    })
</script>

<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img
                :src="closeModal"
                @click="$emit('hide-modal')"    
            />
        </div>

        <div
            class="contenedor contenedor-formulario"
            :class="[modal.animar ? 'animar': 'cerrar']"
        >
            <form
                class="nuevo-gasto"
                @submit.prevent="addSpent"
            >
                <legend>{{ actionText }} Gasto</legend>
                <Alerta v-if="error">
                    {{ error }}
                </Alerta>

                <div class="campo">
                    <label for="name">Nombre del gasto:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Añade el nombre del gasto"
                        :value="name"
                        @input="$emit('update:name', $event.target.value)"
                    >
                </div>
                <div class="campo">
                    <label for="amount">Cantidad:</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Añade cantidad del gasto, pe. 400"
                        :value="amount"
                        @input="$emit('update:amount', +$event.target.value)"
                    >
                </div>
                <div class="campo">
                    <label for="category">Categoría:</label>
                    <select
                        name="category"
                        id="category"
                        :value="category"
                        @input="$emit('update:category', $event.target.value)"
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="others">Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input
                    type="submit"
                    :value="actionText"
                >
            </form>
            <button
                type="button"
                class="btn-eliminar"
                v-if="id"
                @click="$emit('delete-expense',id)"
            >
                Eliminar
            </button>
        </div>
    </div>
</template>

<style scoped>
    .modal {
        position: absolute;
        background-color: rgb(0 0 0 /0.9);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .cerrar-modal {
        position: absolute;
        right: 3rem;
        top: 3rem;
    }
    .cerrar-modal img {
        width: 3rem;
        cursor: pointer;
    }

    .contenedor-formulario {
        transition-property: all;
        transition-duration: 200ms;
        transition-timing-function: ease-in;
        opacity: 0;
    }
    .contenedor-formulario.animar {
        opacity: 1;
    }
    .contenedor-formulario.cerrar {
        opacity: 0;
    }

    .nuevo-gasto {
        margin: 10rem auto 0 auto;
        display: grid;
        gap: 2rem;
    }

    .campo {
        display: grid;
        gap: 2rem;
    }
    .nuevo-gasto legend {
        text-align: center;
        color: var(--blanco);
        font-size: 3rem;
        font-weight: 700;
    }
    .nuevo-gasto input, 
    .nuevo-gasto select{
        background-color: var(--gris-claro);
        border-radius: 1rem;
        padding: 1rem;
        border: none;
        font-size: 2.2rem;
    }
    .nuevo-gasto label {
        color: var(--blanco);
        font-size: 3rem;
    }
    .nuevo-gasto input[type="submit"] {
        background-color: var(--azul);
        color: var(--blanco);
        font-weight: 700;
        cursor: pointer;
    }
    .btn-eliminar {
        padding: 1rem;
        width: 100%;
        background-color: var(--rojo);
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--blanco);
        margin-top: 10rem;
        cursor: pointer;
        border: none;
    }
</style>