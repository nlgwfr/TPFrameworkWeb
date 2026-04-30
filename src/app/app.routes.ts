import { Routes } from '@angular/router';
import { ListeLivresComponent } from './components/liste-livres/liste-livres';
import { DetailLivreComponent } from './components/detail-livre/detail-livre';

export const routes: Routes = [
  { path: '', redirectTo: 'livres', pathMatch: 'full' },
  { path: 'livres', component: ListeLivresComponent },
  { path: 'livres/:id', component: DetailLivreComponent },
  {
    path: 'ajouter',
    loadComponent: () =>
      import('./components/formulaire-livre/formulaire-livre')
        .then(m => m.FormulaireLivre)
  },
  {
    path: 'modifier/:id',
    loadComponent: () =>
      import('./components/formulaire-livre/formulaire-livre')
        .then(m => m.FormulaireLivre)
  },
  { path: '**', redirectTo: 'livres' }
];