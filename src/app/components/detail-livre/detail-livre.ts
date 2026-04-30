import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LivreService } from '../../services/livre';
import { Livre } from '../../models/livre.model';

@Component({
  selector: 'app-detail-livre',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-livre.html',
  styleUrls: ['./detail-livre.css']
})
export class DetailLivreComponent implements OnInit {
  livre: Livre | null = null;

  constructor(
    private route: ActivatedRoute,
    private livreService: LivreService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.livreService.getLivreById(id).subscribe({
        next: (data) => this.livre = data,
        error: () => this.livre = null
      });
    } else {
      this.livre = null;
    }
  }
}