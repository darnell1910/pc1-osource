import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs';
import {MatToolbar} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {environment} from '../../../../../environments/environment';

/**
 * Application shell with the toolbar, the navigation sidenav and the routed content.
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbar,
    MatSidenavModule,
    MatListModule,
    MatIcon,
    MatIconButton,
    TranslatePipe,
    LanguageSwitcher
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {
  private readonly breakpointObserver = inject(BreakpointObserver);

  /**
   * Indicates whether the application is displayed on a small screen.
   */
  protected readonly isHandset = toSignal(
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(map(state => state.matches)),
    {initialValue: false}
  );

  private readonly sidenavToggled = signal(false);

  /**
   * Indicates whether the sidenav is opened. It is always opened on large screens and toggled on small screens.
   */
  protected readonly sidenavOpened = computed(() => !this.isHandset() || this.sidenavToggled());

  /**
   * Local path of the UrbanFit logo.
   */
  protected readonly logoPath = environment.brandLogoPath;

  /**
   * Navigation options displayed in the sidenav.
   */
  protected readonly options = [
    {link: '/home', label: 'navigation.home', icon: 'home'},
    {link: '/reservations/new', label: 'navigation.new-reservation', icon: 'event_available'}
  ];

  /**
   * Opens or closes the sidenav on small screens.
   */
  protected toggleSidenav(): void {
    this.sidenavToggled.update(opened => !opened);
  }

  /**
   * Closes the sidenav after navigating on small screens.
   */
  protected onNavigate(): void {
    if (this.isHandset()) {
      this.sidenavToggled.set(false);
    }
  }

  /**
   * Keeps the toggle state in sync when the sidenav is closed by the backdrop or the escape key.
   * @param opened - New opened state of the sidenav.
   */
  protected onSidenavOpenedChange(opened: boolean): void {
    this.sidenavToggled.set(opened);
  }
}
