# TV Series Explorer (pc17737u202410105)

## Overview
TV Series Explorer is an interactive web application for [TVmaze](https://www.tvmaze.com/) that lets
users browse the TV series available in its public API. The series are obtained from the TVmaze
search endpoint for two main search terms, **Star** and **Love**, ordered by relevance and limited
to the first 12 results of each search.

## Features
- **Toolbar**: TVmaze logo (Logo.dev Logo API), application title and EN | ES language toggle buttons.
- **Series Catalogue view**: toggle buttons to switch between the Star and Love search terms.
- **Series cards**: medium-size poster (`show.image.medium`), name (`show.name`), language, genres, status and average rating (`show.rating.average`) with human-friendly labels.
- **Series Details**: dialog with additional information of the series (summary, type, premiere and end dates, runtime, network, official site and TVmaze page) retrieved from the `/shows/{id}` endpoint.
- **Responsive layout**: three cards per row on large screens, two on medium screens and one on small screens.
- **Internationalization**: English (default) and Spanish for every fixed text of the user interface.
- **Loading, empty and error states**: progress indicator, empty message and retry action.
- **Accessibility**: alternative text for images, ARIA attributes, landmarks and semantic lists.
- **Footer**: copyright notice and developer information.

## Technologies
- Angular 22 (standalone components, Angular Signals)
- TypeScript
- Angular Material 22
- Angular HttpClient
- @ngx-translate/core and @ngx-translate/http-loader
- TVmaze API
- Logo.dev Logo API

## Architecture
The project applies a domain-driven, layered and component-based architecture organized by
bounded contexts:

```
src/app
├── series-assets                    # Series Assets bounded context
│   ├── domain/model                 # Series (Entity), SeriesSearchTerm (Value Object)
│   ├── application                  # SeriesAssetsStore (State Management with Signals), LoadStatus
│   ├── infrastructure               # SeriesApi, SeriesAssembler, SearchSeriesRequest,
│   │                                # SearchSeriesResponse, SeriesResource
│   └── presentation
│       ├── views/series-catalogue   # Series Catalogue main view (container)
│       └── components               # SeriesSearchTermSelector, SeriesList, SeriesCard,
│                                    # SeriesDetailsDialog
└── shared                           # Shared bounded context
    ├── domain/model                 # Url (Value Object)
    ├── infrastructure               # LogoDevApi
    └── presentation/components      # Layout, LanguageSwitcher, Footer
```

### Design patterns
- **Entity**: `Series`, identified by its TVmaze show id.
- **Value Object**: `SeriesSearchTerm` and `Url`.
- **State Management**: `SeriesAssetsStore` keeps the selected search term, a per-term cache of series, a per-id cache of series details and the loading status of every request with Angular Signals.
- **Request / Response / Resource**: `SearchSeriesRequest`, `SearchSeriesResponse` and `SeriesResource` describe the provider contracts.
- **Assembler**: `SeriesAssembler` builds requests and maps provider resources (nested objects such as `image.medium` and `rating.average`, and HTML summaries) into domain entities.
- **Gateway**: `SeriesApi` and `LogoDevApi` encapsulate external services.

## Environment Variables
URLs, paths and keys are defined in `src/environments/environment.development.ts` (development)
and `src/environments/environment.ts` (production):

| Variable | Description |
|:--|:--|
| `seriesProviderApiBaseUrl` | TVmaze API base URL |
| `seriesProviderSearchEndpointPath` | Search endpoint path |
| `seriesProviderShowsEndpointPath` | Shows endpoint path used for the series details |
| `seriesProviderSearchLimit` | Maximum number of series per search term |
| `logoProviderApiBaseUrl` | Logo.dev Logo API base URL |
| `logoProviderPublishableKey` | Logo.dev publishable key |
| `organizationDomain` | Domain used to obtain the toolbar logo |
| `i18nResourcesPath` / `i18nResourcesExtension` | Location of translation files |
| `defaultLanguage` / `supportedLanguages` | Interface languages |

## Getting Started

### Prerequisites
- Node.js 22.22.3 or later (or 24.15.0 or later)
- npm

### Installation
```bash
npm install
```

### Development server
```bash
ng serve
```
Open `http://localhost:4200/` in the browser.

### Building
```bash
ng build
```
The build artifacts are stored in the `dist/` directory.

## Attributions
- TV series data and images provided by the [TVmaze API](https://www.tvmaze.com/api) (CC BY-SA).
- Logo provided by [Logo.dev](https://logo.dev).

## Author
- **Name**: Darnell Apellido
- **Student code**: u202410105
- **Course**: Open-Source Applications Development (1ASI0729), NRC 7737, Universidad Peruana de Ciencias Aplicadas (UPC)
