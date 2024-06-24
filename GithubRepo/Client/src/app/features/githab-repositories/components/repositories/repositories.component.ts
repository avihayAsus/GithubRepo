import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, input, type OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { RepositoryComponent } from '../repository/repository.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IGithubRepository } from '../../models/repository';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CommonModule, RepositoryComponent],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.css',
})
export class RepositoriesComponent implements OnInit, OnDestroy {
  @Input() source$: Observable<IGithubRepository[]> | undefined;
  ondestroy$ = new Subject<void>();
  constructor(public  githubService: GithubService) {}

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.ondestroy$.next();
  }
}
