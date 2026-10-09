<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchTicketById, updateTicket, deleteTicket } from '../services/api.js'

const route = useRoute()
const router = useRouter()
const ticketId = route.params.id

const ticket = ref(null)
const isLoading = ref(true)
const isUpdating = ref(false)
const errorMessage = ref('')

// Formulaire de mise à jour (statut et priorité uniquement)
const updateForm = ref({
  status: '',
  priority: ''
})

const loadTicket = async () => {
  try {
    ticket.value = await fetchTicketById(ticketId)
    // On pré-remplit le formulaire avec les valeurs actuelles
    updateForm.value.status = ticket.value.status
    updateForm.value.priority = ticket.value.priority
  } catch (error) {
    errorMessage.value = "Impossible de charger les détails du ticket."
  } finally {
    isLoading.value = false
  }
}

const handleUpdate = async () => {
  isUpdating.value = true
  errorMessage.value = ''
  try {
    // La fonction updateTicket utilise bien le PATCH avec le merge-patch+json
    ticket.value = await updateTicket(ticketId, updateForm.value)
    alert('Ticket mis à jour avec succès !')
  } catch (error) {
    errorMessage.value = "Erreur lors de la mise à jour."
  } finally {
    isUpdating.value = false
  }
}

const handleDelete = async () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce ticket définitivement ?")) {
    try {
      await deleteTicket(ticketId)
      router.push('/') // Retour au Dashboard après suppression
    } catch (error) {
      errorMessage.value = "Erreur lors de la suppression."
    }
  }
}

onMounted(() => {
  loadTicket()
})
</script>

<template>
  <div class="detail-view">
    <div v-if="isLoading" class="loading">Chargement...</div>
    
    <div v-else-if="errorMessage" class="error-msg">
      {{ errorMessage }}
      <button @click="router.push('/')">Retour au tableau de bord</button>
    </div>

    <div v-else-if="ticket" class="ticket-content">
      <div class="ticket-header">
        <div class="title-section">
          <span class="ticket-id">#{{ ticket.id }}</span>
          <h2>{{ ticket.title }}</h2>
        </div>
        <button @click="handleDelete" class="btn-delete">Supprimer le ticket</button>
      </div>

      <div class="ticket-body">
        <div class="description-box">
          <h3>Description</h3>
          <p>{{ ticket.description }}</p>
          <small class="date">Créé le {{ ticket.createdAt }}</small>
        </div>

        <!-- Zone de modification PATCH -->
        <div class="update-box">
          <h3>Mettre à jour</h3>
          <form @submit.prevent="handleUpdate">
            
            <div class="form-group">
              <label>Changer le statut</label>
              <select v-model="updateForm.status">
                <option value="open">Ouvert</option>
                <option value="in_progress">En cours</option>
                <option value="resolved">Résolu</option>
              </select>
            </div>

            <div class="form-group">
              <label>Changer la priorité</label>
              <select v-model="updateForm.priority">
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
              </select>
            </div>

            <button type="submit" class="btn-update" :disabled="isUpdating">
              {{ isUpdating ? 'Mise à jour...' : 'Sauvegarder les modifications' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-view {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

.title-section h2 {
  margin: 0;
  color: #2c3e50;
}

.ticket-id {
  color: #a0aec0;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  display: block;
}

.ticket-body {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.description-box h3, .update-box h3 {
  color: #4a5568;
  margin-top: 0;
}

.description-box p {
  white-space: pre-wrap;
  line-height: 1.6;
  color: #4a5568;
}

.date {
  display: block;
  margin-top: 2rem;
  color: #a0aec0;
}

.update-box {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.form-group select {
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
}

.btn-update {
  background-color: #35495e;
  color: white;
  border: none;
  padding: 0.75rem;
  width: 100%;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}

.btn-delete {
  background-color: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #fecaca;
}

.error-msg {
  color: #dc2626;
  text-align: center;
}

@media (max-width: 768px) {
  .ticket-body {
    grid-template-columns: 1fr;
  }
}
</style>