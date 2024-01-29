import { Directive, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { musicFeature } from '../../../core/store/music/music.reducer';
import { map, merge, take } from 'rxjs';
import { MusicActions } from '../../../core/store/music/music.actions';

@Directive({
  selector: '[appSetValue]',
  standalone: true,
})
export class SetValueDirective implements OnInit {
  constructor(
    private formGroupDirective: FormGroupDirective,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(musicFeature.selectMusicState)
      .pipe(take(1))
      .subscribe(({ value }) => {
        console.log(value);
        this.formGroupDirective.form.patchValue(value, { emitEvent: false });
      });

    // Suscribirse a los cambios en los controles del formulario
    const controlChanges$ = Object.keys(
      this.formGroupDirective.form.controls
    ).map((key) => {
      return this.formGroupDirective.form
        .get(key)!
        .valueChanges.pipe(map((value) => ({ [key]: value })));
    });

    merge(...controlChanges$).subscribe((changes) => {
      this.store.dispatch(MusicActions.patchValue({ payload: changes }));
    });
  }
}
