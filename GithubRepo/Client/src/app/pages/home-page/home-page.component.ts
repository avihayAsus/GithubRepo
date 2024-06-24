import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { SearchComponent } from '../../features/githab-repositories/components/search/search.component';
import { RepositoriesComponent } from '../../features/githab-repositories/components/repositories/repositories.component';
import { GithubService } from '../../features/githab-repositories/services/github.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    RepositoriesComponent,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  constructor(
    public readonly service: GithubService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
  }
  goToBookmarks() {
    this.router.navigate(['/bookmarks']).then((x) => {});
  }
}
