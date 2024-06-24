import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { Observable, Subject, fromEvent } from 'rxjs';
import { IGithubRepository } from '../../models/repository';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButton, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  $repositories!: Observable<IGithubRepository[]>;
  searchForm!: FormGroup;
  constructor(
    private readonly githubService: GithubService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  public get searchControl(): FormControl {
    return this.searchForm.get('search') as FormControl;
  }
  searchRepositories(): void {
    if (this.searchForm.invalid) return;
    this.githubService.searchRepositories(this.searchControl.value);
  }
}
