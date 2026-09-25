import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Layout} from './shared/presentation/components/layout/layout';
import {SeriesCatalogue} from './series-assets/presentation/views/series-catalogue/series-catalogue';

@Component({
  selector: 'app-root',
  imports: [Layout, SeriesCatalogue],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
}
