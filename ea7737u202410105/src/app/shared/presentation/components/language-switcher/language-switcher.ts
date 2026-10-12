import {ChangeDetectionStrategy, Component, computed, DOCUMENT, inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../../environments/environment';

/**
 * Select buttons that switch the language of the user interface.
 */
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

  /**
   * Languages supported by the user interface.
   */
  protected readonly languages: readonly string[] = environment.supportedLanguages;

  /**
   * Language currently used by the user interface.
   */
  protected readonly currentLanguage = computed(() => this.translate.currentLang() ?? environment.defaultLanguage);

  /**
   * Changes the language of the user interface.
   * @param event - Change event with the selected language.
   */
  protected onLanguageChange(event: MatButtonToggleChange): void {
    const language = event.value as string;
    if (!this.languages.includes(language)) {
      return;
    }
    this.translate.use(language);
    this.document.documentElement.lang = language;
  }
}
