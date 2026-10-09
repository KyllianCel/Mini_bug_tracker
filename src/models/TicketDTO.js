export class TicketDTO {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.priority = data.priority;
    // On formate la date pour l'affichage
    this.createdAt = data.createdAt ? new Date(data.createdAt).toLocaleDateString('fr-FR') : '';
  }
}