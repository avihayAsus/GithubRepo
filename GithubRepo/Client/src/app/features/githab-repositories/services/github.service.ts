import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinct,
  map,
  shareReplay,
  switchMap,
  switchMapTo,
  tap,
  throwError,
} from 'rxjs';
import { IGithubRepositories, IGithubRepository } from '../models/repository';
import { TAB } from '@angular/cdk/keycodes';

@Injectable({ providedIn: 'root' })
export class GithubService {
  url = 'http://localhost:5103/Repository';
  tokenUrl = 'http://localhost:5103/Token';

  constructor(private readonly client: HttpClient) {}

  private loader = new BehaviorSubject<boolean>(false);
  loader$ = this.loader.asObservable();

  private onSearchRepositoriesSubject = new Subject<string>();
  public repositories$ = this.onSearchRepositoriesSubject.asObservable().pipe(
    tap((query) => this.loader.next(true)),
    debounceTime(300),
    distinct(),
    switchMap((query) =>
      this.getRepositories(query).pipe(
        tap((data) => {
          this.loader.next(false);
        })
      )
    )
  );

  public searchRepositories(query: string) {
    this.onSearchRepositoriesSubject.next(query);
  }
  private getRepositories(query: string): Observable<IGithubRepository[]> {
    return this.client
      .get<IGithubRepositories>(`${this.url}/search?query=${query}`)
      .pipe(map((data) => data.items));
  }
  addBookmark(repository: IGithubRepository): Observable<IGithubRepository> {
    return this.client
      .post<IGithubRepository>(`${this.url}`, repository)
      .pipe();
  }

  public getBookmarks(): Observable<IGithubRepository[]> {
    return this.client.get<IGithubRepository[]>(`${this.url}`);
  }

}
