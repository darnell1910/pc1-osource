# UrbanFit Sports Center Management Platform (`ea7737u202410105`)

## Overview
`ea7737u202410105` is an Angular 22 client application for UrbanFit Sports Centers. It manages
reservations, queries the current weather of each sports center and tracks the occupancy of the
facilities. The codebase is organized around Domain-Driven Design (DDD) bounded contexts and
layered responsibilities.

In development mode, the application consumes a local fake API exposed through `json-server`
at `http://localhost:3000` and the public Open-Meteo Weather API.

## Features
- Toolbar with the UrbanFit logo, the platform title and EN / ES language select buttons
- Sidenav with the Home and New Reservation navigation options
- Home view with the My Sports Centers grid list (Total Participants and Available Capacity)
- New Reservation reactive form with validations, automatic sports center selection and current temperature
- Page not found view for unsupported routes
- Signal-based state management (`signal`, `computed`)
- Material Design 3 (M3) styling with custom theme tokens
- Internationalization with English (default) and Spanish resources using `@ngx-translate`
- HTTP communication through Angular `HttpClient` and the REST Assembler pattern
- Layered organization by bounded context:
  - `sports-centers`
  - `weather`
  - `shared`

## Architecture Overview
- **`sports-centers`**: Sports centers, reservations and capacity management.
- **`weather`**: Current weather information provided by the external API provider (Open-Meteo).
- **`shared`**: Base contracts, base API infrastructure, shell layout and common views.

Each bounded context is structured into four layers:
- **`domain`**: Entities (with native ECMAScript `#` private fields) and value objects.
- **`application`**: Signal-based state management stores.
- **`infrastructure`**: API services, endpoints, assemblers, requests, responses and resources.
- **`presentation`**: Standalone components and routed views.

## Project Structure

```text
ea7737u202410105/
├── public/
│   ├── assets/images/urbanfit-logo.svg  # Brand logo asset
│   ├── favicon.svg
│   └── i18n/                            # en.json, es.json
├── server/
│   ├── db.json                          # Fake API database
│   └── start.sh                         # Fake API launcher
├── src/
│   ├── environments/                    # environment.ts, environment.development.ts
│   ├── material-theme.scss
│   ├── styles.css
│   └── app/
│       ├── app.config.ts
│       ├── app.routes.ts
│       ├── app.ts / app.html / app.css
│       ├── shared/
│       │   ├── domain/model/            # BaseEntity
│       │   ├── infrastructure/          # BaseApi, BaseApiEndpoint, BaseAssembler, BaseResponse
│       │   └── presentation/
│       │       ├── components/          # layout, language-switcher, footer-content, base-form
│       │       └── views/               # home, page-not-found
│       ├── sports-centers/
│       │   ├── application/             # SportsCentersStore
│       │   ├── domain/model/            # SportsCenter, Reservation, SportsCenterOccupancy, ActivityType
│       │   ├── infrastructure/          # SportsCentersService, endpoints, assemblers, responses, request
│       │   ├── presentation/
│       │   │   ├── components/          # sports-center-summary, sports-center-summary-list
│       │   │   └── views/               # reservation-form
│       │   └── sports-centers.routes.ts
│       └── weather/
│           ├── application/             # WeatherStore
│           ├── domain/model/            # CurrentWeather
│           ├── infrastructure/          # WeatherService, endpoint, assembler, request, response
│           └── presentation/components/ # current-temperature
├── angular.json
├── eslint.config.js
├── package.json
└── tsconfig.json
```

## Installation

```bash
npm install
```

## Starting the Fake API

```bash
cd server
json-server --watch db.json
```

## Running the Application

```bash
npm start
```

Open `http://localhost:4200/` (redirects to `/home`).

## Available Scripts
- `npm start` - Starts the development server (`ng serve`).
- `npm run build` - Builds the production bundles (`ng build`).
- `npm run lint` - Lints TypeScript and HTML files (`ng lint`).
- `npm run server` - Starts the fake API from the project root.
