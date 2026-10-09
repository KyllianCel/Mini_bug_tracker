<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filter'])

const filters = ref({
  title: '',
  status: '',
  priority: ''
})

const applyFilters = () => {
  // On émet un événement avec une copie des filtres
  emit('filter', { ...filters.value })
}

const resetFilters = () => {
  filters.value = { title: '', status: '', priority: '' }
  applyFilters()
}
</script>

<template>
  <div class="filter-bar">
    <form @submit.prevent="applyFilters" class="filter-form">
      <div class="form-group">
        <label>Recherche par titre</label>
        <input type="text" v-model="filters.title" placeholder="Ex: bug d'affichage..." />
      </div>

      <div class="form-group">
        <label>Statut</label>
        <select v-model="filters.status">
          <option value="">Tous</option>
          <option value="open">Ouvert</option>
          <option value="in_progress">En cours</option>
          <option value="resolved">Résolu</option>
        </select>
      </div>

      <div class="form-group">
        <label>Priorité</label>
        <select v-model="filters.priority">
          <option value="">Toutes</option>
          <option value="low">Basse</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
        </select>
      </div>

      <div class="filter-actions">
        <button type="submit" class="btn-primary">Filtrer</button>
        <button type="button" @click="resetFilters" class="btn-secondary">Réinitialiser</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.filter-bar {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 200px;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.form-group input, .form-group select {
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  font-size: 1rem;
}

.filter-actions {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: #35495e;
  color: white;
}

.btn-primary:hover {
  background-color: #2c3e50;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background-color: #cbd5e0;
}
</style>