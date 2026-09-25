import {ChangeDetectionStrategy, Component, computed, DOCUMENT, inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../../environments/environment';

/**
 * Presentation component that switches the user interface language.
 *
 * @remarks
 * Renders the EN | ES toggle buttons shown on the right side of the toolbar. It delegates
 * the language change to ngx-translate and keeps the `lang` attribute of the document in
 * sync so that assistive technologies read the content with the right pronunciation.
 *
 * @author Darnell Apellido
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcher {
  /** Translation service that manages the runtime language. */
  private readonly translate = inject(TranslateService);
  /** Document reference used to update the `lang` attribute. */
  private readonly document = inject(DOCUMENT);

  /** Language codes supported by the application. */
  protected readonly languages: ReadonlyArray<string> = environment.supportedLanguages;
  /** Language currently active in the user interface. */
  protected readonly currentLanguage = computed(
    () => this.translate.currentLang() ?? environment.defaultLanguage
  );

  /**
   * Activates the language chosen in the toggle group.
   *
   * @param event - Change event emitted by the toggle group.
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
