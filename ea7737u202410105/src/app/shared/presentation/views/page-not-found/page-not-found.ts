import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Fallback view displayed for unsupported navigation routes.
 */
@Component({
  selector: 'app-page-not-found',
  imports: [MatButton, MatIcon, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFound {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /**
   * Requested path that was not found.
   */
  protected readonly invalidPath = `/${this.route.snapshot.url.map(segment => segment.path).join('/')}`;

  /**
   * Navigates to the Home view.
   */
  protected navigateToHome(): void {
    this.router.navigate(['/home']).then();
  }
}
