import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {TranslatePipe} from '@ngx-translate/core';
import {LogoDevApi} from '../../../infrastructure/logo-dev-api';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {Footer} from '../footer/footer';
import {environment} from '../../../../../environments/environment';

/**
 * Shell component that frames every view of the application.
 *
 * @remarks
 * Renders the toolbar (TVmaze logo, application title and language switcher), a
 * main landmark where the active view is projected, and the footer. The projected view
 * is supplied by the root component, so this shared component does not depend on any
 * other bounded context.
 */
@Component({
  selector: 'app-layout',
  imports: [MatToolbar, TranslatePipe, LanguageSwitcher, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {
  /** Logo provider gateway. */
  private readonly logoApi = inject(LogoDevApi);

  /** Logo URL of the organization shown in the toolbar. */
  protected readonly logoUrl = this.logoApi.getUrlToLogo(environment.organizationDomain);
}
