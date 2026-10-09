import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: DashboardView },
  { path: '/create', name: 'Create', component: () => import('../views/TicketCreateView.vue') },
  { path: '/ticket/:id', name: 'Detail', component: () => import('../views/TicketDetailView.vue') }
]

export default createRouter({ history: createWebHistory(), routes })