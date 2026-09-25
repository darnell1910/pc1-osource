import {ChangeDetectionStrategy, Component, computed, DOCUMENT, inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  protected readonly languages: ReadonlyArray<string> = environment.supportedLanguages;
  protected readonly currentLanguage = computed(
    () => this.translate.currentLang() ?? environment.defaultLanguage
  );

  protected onLanguageChange(event: MatButtonToggleChange): void {
    const language = event.value as string;
    if (!this.languages.includes(language)) {
      return;
    }
    this.translate.use(language);
    this.document.documentElement.lang = language;
  }
}
