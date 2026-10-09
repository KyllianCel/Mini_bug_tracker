import { TicketDTO } from '../models/TicketDTO.js';

const API_URL = 'http://localhost:8080/api/tickets';

// Récupérer la liste des tickets
export async function fetchTickets(page = 1, status = '', priority = '', title = '') {
  try {
    const url = new URL(API_URL);
    url.searchParams.append('page', page);
    if (status) url.searchParams.append('status', status);
    if (priority) url.searchParams.append('priority', priority);
    if (title) url.searchParams.append('title', title);

    const response = await fetch(url);
    if (!response.ok) throw new Error('Erreur réseau lors de la récupération des tickets');
    
    const data = await response.json();
    
    const ticketsData = Array.isArray(data) ? data : (data.tickets || data.items || data['hydra:member'] || []);
    
    return ticketsData.map(ticket => new TicketDTO(ticket));
  } catch (error) {
    console.error("Impossible de charger les tickets :", error);
    throw error;
  }
}

// Récupérer un seul ticket pour la vue détaillée
export async function fetchTicketById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Ticket non trouvé');
    const data = await response.json();
    return new TicketDTO(data);
  } catch (error) {
    console.error("Erreur fetchTicketById :", error);
    throw error;
  }
}

// Créer un nouveau ticket
export async function createTicket(ticketData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticketData)
    });
    
    if (!response.ok) throw new Error('Erreur lors de la création du ticket');
    const data = await response.json();
    return new TicketDTO(data);
  } catch (error) {
    console.error("Erreur createTicket :", error);
    throw error;
  }
}

// Mettre à jour un ticket
export async function updateTicket(id, updateData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        // En-tête obligatoire pour le TP
        'Content-Type': 'application/merge-patch+json'
      },
      body: JSON.stringify(updateData)
    });
    
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du ticket');
    const data = await response.json();
    return new TicketDTO(data);
  } catch (error) {
    console.error("Erreur updateTicket :", error);
    throw error;
  }
}

// Supprimer un ticket
export async function deleteTicket(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    
    // L'API retourne un code 204 en cas de succès
    if (!response.ok && response.status !== 204) {
      throw new Error('Erreur lors de la suppression');
    }
    return true;
  } catch (error) {
    console.error("Erreur deleteTicket :", error);
    throw error;
  }
}