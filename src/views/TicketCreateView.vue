<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { createTicket } from '../services/api.js'

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')

const formData = ref({
  title: '',
  description: '',
  priority: 'low',
  status: 'open' // Un nouveau ticket est toujours ouvert par défaut
})

// Validation réactive selon les règles du TP
const isTitleValid = computed(() => formData.value.title.length >= 3 && formData.value.title.length <= 255)
const isDescriptionValid = computed(() => formData.value.description.length >= 15)
const isFormValid = computed(() => isTitleValid.value && isDescriptionValid.value)

const submitTicket = async () => {
  if (!isFormValid.value) return

  isLoading.value = true
  errorMessage.value = ''
  
  try {
    await createTicket(formData.value)
    // Redirection vers le tableau de bord après création réussie
    router.push('/')
  } catch (error) {
    errorMessage.value = "Erreur lors de la création du ticket. Vérifiez votre connexion."
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="create-view">
    <h2>Créer un nouveau ticket</h2>

    <div v-if="errorMessage" class="error-msg">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="submitTicket" class="ticket-form">
      <!-- Champ Titre -->
      <div class="form-group">
        <label for="title">Titre du problème *</label>
        <input 
          type="text" 
          id="title" 
          v-model="formData.title" 
          placeholder="Ex: Le bouton de connexion ne fonctionne plus"
          :class="{ 'invalid': !isTitleValid && formData.title.length > 0 }"
        />
        <span class="help-text" v-if="!isTitleValid && formData.title.length > 0">
          Le titre doit faire entre 3 et 255 caractères.
        </span>
      </div>

      <!-- Champ Description -->
      <div class="form-group">
        <label for="description">Description détaillée *</label>
        <textarea 
          id="description" 
          v-model="formData.description" 
          rows="5"
          placeholder="Décrivez le bug..."
          :class="{ 'invalid': !isDescriptionValid && formData.description.length > 0 }"
        ></textarea>
        <span class="help-text" v-if="!isDescriptionValid && formData.description.length > 0">
          La description doit contenir au moins 15 caractères.
        </span>
      </div>

      <!-- Champ Priorité -->
      <div class="form-group">
        <label for="priority">Priorité</label>
        <select id="priority" v-model="formData.priority">
          <option value="low">Basse (Vert)</option>
          <option value="medium">Moyenne (Orange)</option>
          <option value="high">Haute (Rouge)</option>
        </select>
      </div>

      <!-- Actions -->
      <div class="form-actions">
        <button type="button" class="btn-cancel" @click="router.push('/')">Annuler</button>
        <button type="submit" class="btn-submit" :disabled="!isFormValid || isLoading">
          {{ isLoading ? 'Création en cours...' : 'Créer le ticket' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.create-view {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 0.5rem;
}

.error-msg {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

input, textarea, select {
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #42b883;
}

.invalid {
  border-color: #dc2626;
}

.help-text {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  font-size: 1rem;
}

.btn-cancel {
  background-color: #e2e8f0;
  color: #4a5568;
}

.btn-submit {
  background-color: #42b883;
  color: white;
}

.btn-submit:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}
</style>