<script setup>
</script>

<template>
  <header class="app-header">
    <h1>Mini Bug-Tracker</h1>
    <nav>
      <!-- router-link permet de naviguer sans recharger la page -->
      <router-link to="/">Dashboard</router-link>
      <router-link to="/create">Nouveau Ticket</router-link>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 2rem;
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.app-header nav a {
  margin-left: 1.5rem;
  text-decoration: none;
  color: #42b883;
  font-weight: bold;
  transition: color 0.3s;
}

.app-header nav a:hover {
  color: #35495e;
}

.app-header nav a.router-link-exact-active {
  color: #35495e;
  border-bottom: 2px solid #35495e;
  padding-bottom: 4px;
}
</style>