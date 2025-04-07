import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-favorites',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],  
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  searchTerm: string = '';

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit() {
    const username = localStorage.getItem('username');
    if (!username) return;

    this.youtubeService.getFavorites(username).subscribe({
      next: (res) => this.favorites = res,
      error: () => this.favorites = []
    });
  }

  filteredFavorites() {
    if (!this.searchTerm.trim()) {
      return this.favorites;
    }
    return this.favorites.filter(fav =>
      fav.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  removeFavorite(videoId: string) {
    const username = localStorage.getItem('username');
    if (!username) return;

    const payload = { username, videoId };
    this.youtubeService.removeFavorite(payload).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(fav => fav.videoId !== videoId);
      },
      error: () => alert('Error al eliminar el favorito ❌')
    });
  }
  
}
