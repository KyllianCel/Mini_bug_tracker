<script setup>
import { ref, onMounted } from 'vue'
import { fetchTickets } from '../services/api.js'
import TicketCard from '../components/TicketCard.vue'
import FilterBar from '../components/FilterBar.vue'

const tickets = ref([])
const currentPage = ref(1)
const currentFilters = ref({ title: '', status: '', priority: '' })
const isLoading = ref(false)
const errorMessage = ref('')

// Fonction pour charger les données depuis l'API
const loadTickets = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    tickets.value = await fetchTickets(
      currentPage.value, 
      currentFilters.value.status, 
      currentFilters.value.priority, 
      currentFilters.value.title
    )
  } catch (error) {
    errorMessage.value = "Impossible de récupérer les tickets. Vérifiez que l'API est lancée."
  } finally {
    isLoading.value = false
  }
}

// Déclenché quand le composant FilterBar émet l'événement "filter"
const handleFilters = (newFilters) => {
  currentFilters.value = newFilters
  currentPage.value = 1 // On revient à la page 1 lors d'une nouvelle recherche
  loadTickets()
}

// Gestion de la pagination
const nextPage = () => {
  currentPage.value++
  loadTickets()
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    loadTickets()
  }
}

// Au chargement du composant, on fetch les tickets
onMounted(() => {
  loadTickets()
})
</script>

<template>
  <div class="dashboard">
    <h2>Tableau de bord des anomalies</h2>
    
    <!-- Notre barre de filtre -->
    <FilterBar @filter="handleFilters" />

    <div v-if="errorMessage" class="error-msg">
      {{ errorMessage }}
    </div>

    <div v-if="isLoading" class="loading">
      Chargement des tickets...
    </div>

    <div v-else>
      <div v-if="tickets.length === 0" class="empty-state">
        Aucun ticket ne correspond à votre recherche.
      </div>

      <!-- La boucle v-for exigée avec la directive :key -->
      <div class="tickets-list">
        <TicketCard 
          v-for="ticket in tickets" 
          :key="ticket.id" 
          :ticket="ticket" 
        />
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">
          &laquo; Précédent
        </button>
        <span class="page-info">Page {{ currentPage }}</span>
        <button @click="nextPage" :disabled="tickets.length === 0" class="page-btn">
          Suivant &raquo;
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.error-msg {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
}

.loading, .empty-state {
  text-align: center;
  padding: 3rem;
  color: #718096;
  font-size: 1.2rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.page-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.page-btn:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.page-info {
  font-weight: bold;
  color: #4a5568;
}
</style>