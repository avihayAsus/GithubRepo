import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { RepositoriesComponent } from '../../features/githab-repositories/components/repositories/repositories.component';
import { GithubService } from '../../features/githab-repositories/services/github.service';
import { Observable, of, shareReplay } from 'rxjs';
import { IGithubRepository } from '../../features/githab-repositories/models/repository';

@Component({
  selector: 'app-bookmarks-page',
  standalone: true,
  imports: [CommonModule, RepositoriesComponent],
  templateUrl: './bookmarks-page.component.html',
  styleUrl: './bookmarks-page.component.css',
})
export class BookmarksPageComponent implements OnInit {
  source$ = this.githubService.getBookmarks().pipe(shareReplay(1));
  constructor(public githubService: GithubService) {}
  ngOnInit(): void {
  }
}
