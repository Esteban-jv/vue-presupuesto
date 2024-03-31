<script setup>
  import { ref, reactive, onMounted, computed, watch } from 'vue';
  import Presupuesto from './components/Presupuesto.vue'
  import ControlPresupuesto from './components/ControlPresupuesto.vue';
  import Gasto from './components/Gasto.vue';
  import Modal from './components/Modal.vue'
  import Filtros from './components/Filtros.vue';
  import iconoNuevoGasto from './assets/img/nuevo-gasto.svg'
  import { genId } from './helpers'

  /* DATA */
  const modal = reactive({
    mostrar: false,
    animar: false
  })

  const budget = ref(0)
  const available = ref(0)
  const totalSpent = ref(0)
  const filter = ref('')

  const spent = reactive({
    name: '',
    amount: '',
    category: '',
    id: null,
    date: Date.now(),
  })
  const expenses = ref([])

  /* MOUNTED */
  onMounted(() => {
    const storageBudget = localStorage.getItem('budget')
    const storageExpenses = localStorage.getItem('expenses')
    if(storageBudget) {
      budget.value = Number(storageBudget);
      available.value = Number(storageBudget);
    }
    if(storageExpenses) {
      expenses.value = JSON.parse(storageExpenses);
    }
  })

  /* METHODS */
  const setBudget = amount => {
    budget.value = amount
    available.value = amount
  }

  const showModal = () => {
    modal.mostrar = true;
    setTimeout(() => {
      modal.animar = true;
    }, 200)
  }
  const hideModal = () => {
    modal.animar = false;
    setTimeout(() => {
      modal.mostrar = false;
    }, 200)
  }

  const saveSpent = () => {
    if(spent.id) {
      const index = expenses.value.findIndex(e => e.id === spent.id)
      expenses.value[index] = {...spent}
    } else {
      expenses.value.push({
        ...spent,
        id: genId()
      })
    }

    hideModal()
  }

  const selectExpense = id => {
    const expense = expenses.value.filter(e => e.id === id)[0]
    Object.assign(spent, expense)
    showModal()
  }

  const deleteExpense = id => {
    if(confirm('Seguro?')) {
      expenses.value = expenses.value.filter( e => e.id !== id)
      hideModal()
    }
  }

  const resetApp = () => {
    if(confirm("¿Deseas eliminar el presupuesto de gastos?")) {
      expenses.value = []
      budget.value = 0
    }
  }

  /* COMPUTED */
  const filteredExpenses = computed(() => {
    if(filter.value) {
      return expenses.value.filter( e => e.category === filter.value )
    } else {
      return expenses.value
    }
  })

  /* WATCH */
  watch(expenses, () => {
    totalSpent.value = expenses.value.reduce((total, expense) => expense.amount + total, 0)
    available.value = budget.value - totalSpent.value

    localStorage.setItem('expenses', JSON.stringify(expenses.value))
  }, {
    deep: true
  })

  watch(modal, () => {
    if(!modal.mostrar) {
      Object.assign(spent, {
        name: '',
        amount: '',
        category: '',
        id: null,
        date: Date.now(),
      })
    }
  }, {
    deep: true
  })

  watch(budget, () => {
    localStorage.setItem('budget',budget.value)
  })

</script>

<template>
  <div
    :class="{fijar : modal.mostrar}"
  >
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto
          v-if="!budget"
          @set-budget="setBudget"
        />
        <ControlPresupuesto v-else
          :budget="budget"
          :available="available"
          :spent="totalSpent"
          @reset-app="resetApp"
        />
      </div>
    </header>

    <main v-if="budget>0">
      <Filtros
        v-model:filter="filter"
        @update-filter="updateFilter"
      />
      <div class="listado-gastos contenedor">
        <h2>{{ filteredExpenses.length ? 'Gastos' : 'No hay gastos' }}</h2>

        <Gasto
          v-for="expense in filteredExpenses"
          :key="expense.id"
          :expense="expense"
          @select-expense="selectExpense"
        />
      </div>

      <div class="crear-gasto">
        <img
          :src="iconoNuevoGasto"
          alt="icono nuevo gasto"
          @click="showModal"
        >
      </div>

      <Modal
        v-if="modal.mostrar"
        :modal="modal"
        :available="available"
        :id="spent.id"
        v-model:name="spent.name"
        v-model:amount="spent.amount"
        v-model:category="spent.category"

        @hide-modal="hideModal"
        @save-spent="saveSpent"
        @delete-expense="deleteExpense"
      />
    </main>
  </div>
</template>

<style>
  :root {
    --azul: #3b82f6;
    --blanco: #FFF;
    --gris-claro: #F5F5F5;
    --gris: #94a3b8;
    --gris-oscuro: #64748b;
    --negro: #000;
    --rojo: #ef4444;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body {
    font-size: 1.6rem;
    font-family: "Lato", sans-serif;
    background-color: var(--gris-claro);
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 3rem;
  }
  .fijar {
    overflow: hidden;
    height: 100vh;
  }
  header {
    background-color: var(--azul);
  }
  header h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }
  .contenedor {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }
  .contenedor-header {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }
  .sombra {
    box-shadow: 0px 10px 15px -3px rgb(0,0,0,0.1);
    background-color: var(--blanco);
    border-radius: 1.2rem;
    padding: 5rem;
  }

  .crear-gasto {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
  }
  .crear-gasto img {
    width: 5rem;
    cursor: pointer;
  }

  .listado-gastos {
    margin-top: 10rem;
  }
  .listado-gastos h2 {
    font-weight: 900;
    color: var(--gris-oscuro);
  }
</style>
