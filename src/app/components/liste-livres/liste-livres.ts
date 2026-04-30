import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LivreService } from '../../services/livre';
import { Livre } from '../../models/livre.model';

@Component({
  selector: 'app-liste-livres',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './liste-livres.html',
  styleUrls: ['./liste-livres.css']
})
export class ListeLivresComponent implements OnInit {
  livres: Livre[] = [];
  isLoading: boolean = true;
  erreur: string = '';
  recherche: string = '';

  constructor(private livreService: LivreService) {}

  ngOnInit(): void {
    this.livreService.getLivres().subscribe({
      next: (data) => {
        this.livres = data;
        this.isLoading = false;
      },
      error: () => {
        this.erreur = 'Impossible de charger les livres. Vérifiez que json-server est démarré.';
        this.isLoading = false;
      }
    });
  }

  get livresFiltres(): Livre[] {
    const terme = this.recherche.toLowerCase();
    return this.livres.filter(l =>
      l.titre.toLowerCase().includes(terme) ||
      l.auteur.toLowerCase().includes(terme)
    );
  }

  supprimerLivre(id: string | number): void {
    if (confirm('Supprimer ce livre définitivement ?')) {
      this.livreService.supprimerLivre(id).subscribe(() => {
        this.livres = this.livres.filter(l => l.id !== id);
      });
    }
  }
}