import {ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, signal, untracked} from '@angular/core';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCentersStore} from '../../../application/sports-centers.store';
import {WeatherStore} from '../../../../weather/application/weather.store';
import {CurrentTemperature} from '../../../../weather/presentation/components/current-temperature/current-temperature';
import {ACTIVITY_TYPES, ActivityType} from '../../../domain/model/activity-type';
import {Reservation} from '../../../domain/model/reservation.entity';

/**
 * View with the reactive form used to register a new reservation in the sports center of the selected activity type.
 */
@Component({
  selector: 'app-reservation-form',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatCardModule,
    MatFormFieldModule,
    MatIcon,
    MatInput,
    MatProgressBar,
    MatSelectModule,
    TranslatePipe,
    CurrentTemperature
  ],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationForm {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Store with the sports centers and reservations state.
   */
  protected readonly sportsCentersStore = inject(SportsCentersStore);

  /**
   * Store with the current weather state.
   */
  protected readonly weatherStore = inject(WeatherStore);

  /**
   * Activity types available for selection.
   */
  protected readonly activityTypes = ACTIVITY_TYPES;

  /**
   * Reactive form of the reservation.
   */
  protected readonly form = this.formBuilder.group({
    activityType: new FormControl<ActivityType | null>(null, Validators.required),
    participantName: ['', [Validators.required, Validators.pattern(/\S/)]],
    participants: [1, [Validators.required, Validators.min(1)]]
  });

  private readonly selectedActivityType = toSignal(this.form.controls.activityType.valueChanges, {initialValue: null});

  /**
   * Occupancy of the sports center associated with the selected activity type.
   */
  protected readonly selectedOccupancy = computed(() => {
    const activityType = this.selectedActivityType();
    return activityType ? this.sportsCentersStore.getOccupancyByActivityType(activityType) : undefined;
  });

  private readonly selectedSportsCenter = computed(() => this.selectedOccupancy()?.sportsCenter);

  /**
   * Indicates whether the reservation is being saved.
   */
  protected readonly saving = signal(false);

  /**
   * Indicates whether the last save attempt failed.
   */
  protected readonly saveFailed = signal(false);

  /**
   * Creates an instance of ReservationForm and keeps the weather and capacity validation in sync with the selected activity type.
   */
  constructor() {
    this.weatherStore.clear();
    this.destroyRef.onDestroy(() => this.weatherStore.clear());

    effect(() => {
      const sportsCenter = this.selectedSportsCenter();
      untracked(() => sportsCenter
        ? this.weatherStore.loadCurrentWeather(sportsCenter.latitude, sportsCenter.longitude)
        : this.weatherStore.clear());
    });

    effect(() => {
      const availableCapacity = this.selectedOccupancy()?.availableCapacity;
      const participants = this.form.controls.participants;
      participants.setValidators(availableCapacity === undefined
        ? [Validators.required, Validators.min(1)]
        : [Validators.required, Validators.min(1), Validators.max(availableCapacity)]);
      participants.updateValueAndValidity();
    });
  }

  /**
   * Indicates whether the reservation can be created: the form is valid, a sports center was identified,
   * a valid temperature is available and no save is in progress.
   */
  protected canCreate(): boolean {
    return this.form.valid && !!this.selectedOccupancy() && !!this.weatherStore.currentWeather() && !this.saving();
  }

  /**
   * Creates the reservation and navigates to Home only after it is saved successfully.
   */
  protected onCreate(): void {
    const occupancy = this.selectedOccupancy();
    const currentWeather = this.weatherStore.currentWeather();
    if (!this.canCreate() || !occupancy || !currentWeather) {
      this.form.markAllAsTouched();
      return;
    }
    const {participantName, participants} = this.form.getRawValue();
    const reservation = new Reservation({
      sportsCenterId: occupancy.sportsCenter.id,
      activityType: occupancy.sportsCenter.activityType,
      participantName: participantName.trim(),
      participants,
      weatherTemperature: currentWeather.temperature,
      reservedAt: new Date()
    });
    this.saving.set(true);
    this.saveFailed.set(false);
    this.sportsCentersStore.addReservation(reservation)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/home']).then(),
        error: () => {
          this.saving.set(false);
          this.saveFailed.set(true);
        }
      });
  }

  /**
   * Returns to Home without saving.
   */
  protected onCancel(): void {
    this.router.navigate(['/home']).then();
  }

  /**
   * Repeats the current weather query of the selected sports center.
   */
  protected onRetryWeather(): void {
    this.weatherStore.retry();
  }
}
