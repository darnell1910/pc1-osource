import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Layout} from './shared/presentation/components/layout/layout';
import {SeriesCatalogue} from './series-assets/presentation/views/series-catalogue/series-catalogue';

/**
 * Root component of TV Series Explorer.
 *
 * @remarks
 * Composes the shared layout shell and projects the Series Catalogue view into it.
 * Routing is out of scope, so the catalogue is the only view of the application.
 *
 * @author Darnell Apellido
 */
@Component({
  selector: 'app-root',
  imports: [Layout, SeriesCatalogue],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
}
