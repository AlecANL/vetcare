import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  getUserRole(role: number) {
    const roleBadgeMap: Record<number, string> = {
      1: 'Administrador',
      2: 'Veterinario',
      3: 'Recepcionista',
    };

    return roleBadgeMap[role] || 'default-badge';
  }

  mappedUserBadge(role: number) {
    const roleBadgeMap: Record<number, string> = {
      1: 'badge-admin',
      2: 'badge-asistente',
      3: 'badge-recepcionista',
    };

    return roleBadgeMap[role] || 'default-badge';
  }
}
