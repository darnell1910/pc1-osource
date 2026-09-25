import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {TranslatePipe} from '@ngx-translate/core';
import {LogoDevApi} from '../../../infrastructure/logo-dev-api';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {Footer} from '../footer/footer';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-layout',
  imports: [MatToolbar, TranslatePipe, LanguageSwitcher, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {
  private readonly logoApi = inject(LogoDevApi);

  protected readonly logoUrl = this.logoApi.getUrlToLogo(environment.organizationDomain);
}
