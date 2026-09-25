import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Shared presentation component rendering the application footer.
 *
 * @remarks
 * Shows the TV Series Explorer copyright notice on the first line and the developer
 * information (student code, first name and last name) on the second line.
 *
 * @author Darnell Apellido
 */
@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
  /** Student code of the developer. */
  protected readonly developerCode = 'u202410105';
  /** First name and last name of the developer. */
  protected readonly developerFullName = 'Darnell Apellido';
}
