<script setup>
import { computed } from 'vue'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

// Code couleur dynamique selon la priorité
const priorityClass = computed(() => {
  switch (props.ticket.priority) {
    case 'high': return 'priority-high';
    case 'medium': return 'priority-medium';
    case 'low': return 'priority-low';
    default: return '';
  }
})

const statusLabel = computed(() => {
  const statuses = {
    open: 'Ouvert',
    in_progress: 'En cours',
    resolved: 'Résolu'
  }
  return statuses[props.ticket.status] || props.ticket.status
})
</script>

<template>
  <div class="ticket-card">
    <div class="ticket-header">
      <h3>{{ ticket.title }}</h3>
      <span class="badge" :class="priorityClass">
        {{ ticket.priority }}
      </span>
    </div>
    
    <p class="ticket-desc">{{ ticket.description.substring(0, 100) }}...</p>
    
    <div class="ticket-footer">
      <span class="status">Statut: <strong>{{ statusLabel }}</strong></span>
      <!-- Navigation vers la vue détaillée demandée par le TP -->
      <router-link :to="`/ticket/${ticket.id}`" class="btn-detail">Voir détails</router-link>
    </div>
  </div>
</template>

<style scoped>
.ticket-card {
  background: #ffffff;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.ticket-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.ticket-header h3 {
  margin: 0;
  color: #2c3e50;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
}

/* Les couleurs dynamiques pour les priorités */
.priority-high { background-color: #fee2e2; color: #dc2626; }
.priority-medium { background-color: #fef3c7; color: #d97706; }
.priority-low { background-color: #dcfce7; color: #16a34a; }

.ticket-desc {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.ticket-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.btn-detail {
  background-color: #42b883;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}

.btn-detail:hover {
  background-color: #3aa876;
}
</style>