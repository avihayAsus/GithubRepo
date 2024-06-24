import { I } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  type OnInit,
} from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { IGithubRepository } from '../../models/repository';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { GithubService } from '../../services/github.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.css',
})
export class RepositoryComponent implements OnInit, OnDestroy {
  @Input() repository!: IGithubRepository;
  ondestroy$ = new Subject<void>();
  constructor(private readonly service: GithubService) {}

  ngOnInit(): void {}
  bookmark() {
    if (!this.repository) return;

    this.service
      .addBookmark(this.repository)
      .pipe(takeUntil(this.ondestroy$), tap(() => alert('Bookmarked!')))
      .subscribe();
  }
  ngOnDestroy(): void {
    this.ondestroy$.next();
  }
}
