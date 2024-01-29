import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InputTextModule } from 'primeng/inputtext';
import { musicFeature } from '../../../../core/store/music/music.reducer';
import { distinctUntilChanged, map, merge, take } from 'rxjs';
import { Song } from '../../../../core/store/music/music.model';
import { MusicActions } from '../../../../core/store/music/music.actions';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss',
})
export class MusicComponent implements OnInit {
  // https://web.archive.org/web/20230128070446/https://www.thisdot.co/blog/modular-multi-step-form-with-ngrx-in-less-than-20-minutes
  // https://github.com/danmt/embrace-power-solution/blob/master/src/app/personal/personal.component.ts
  musicForm = this.fb.group({
    name: this.fb.control<string | null>(null, Validators.required),
    author: this.fb.control<string | null>(null),
  });

  nameCtrl = this.musicForm.get('name');
  authorCtrl = this.musicForm.get('author');

  constructor(
    private fb: FormBuilder,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(musicFeature.selectMusicState)
      .pipe(take(1))
      .subscribe(({ value }) =>
        this.musicForm.patchValue(value, { emitEvent: false })
      );

    const name$ = this.nameCtrl!.valueChanges.pipe(
      map((name: string | null) => ({ name: name }) as Partial<Song>)
    );

    const author$ = this.authorCtrl!.valueChanges.pipe(
      map((author: string | null) => ({ author: author }) as Partial<Song>)
    );

    merge(name$, author$).subscribe((payload: Partial<Song>) => {
      console.log(payload);
      return this.store.dispatch(MusicActions.patchValue({ payload }));
    });

    this.musicForm.valueChanges
      .pipe(
        map(() => this.musicForm.valid),
        distinctUntilChanged()
      )
      .subscribe((isValid: boolean) =>
        this.store.dispatch(MusicActions.changeValidationStatus({ isValid }))
      );
  }
}
