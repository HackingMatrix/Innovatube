import { Component } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],  
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm = '';
  videos: any[] = [];
  loading = false;

  constructor(private youtubeService: YoutubeService) {}

  search() {
    if (!this.searchTerm.trim()) return;

    this.loading = true;
    this.youtubeService.searchVideos(this.searchTerm).subscribe({
      next: (res) => {
        this.videos = res.items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.videos = [];
      }
    });
  }

  addToFavorites(video: any) {
    const username = localStorage.getItem('username');
    if (!username) return;
  
    const payload = {
      username,
      videoId: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.default.url,
      channelTitle: video.snippet.channelTitle
    };
  
    this.youtubeService.saveFavorite(payload).subscribe({
      next: () => {
        alert('Video guardado en favoritos ✅');
      },
      error: () => {
        alert('Error al guardar favorito ❌');
      }
    });
  }
  
}
