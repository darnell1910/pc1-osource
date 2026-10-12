# UrbanFit Sports Center Management Platform (ea7737u202410105)

Smart reservations and capacity management for UrbanFit Sports Centers, built with Angular 22,
Angular Material, ngx-translate, Angular Signals and the Open-Meteo Weather API.

## Getting started

```bash
npm install
```

Start the Fake API (json-server 0.17.4):

```bash
cd server
json-server --watch db.json
```

or `npm run server`. Then start the application:

```bash
ng serve
```

Open `http://localhost:4200/` (redirects to `/home`).

## Routes

| Path                | View            |
|:--------------------|:----------------|
| `/home`             | Home            |
| `/reservations/new` | New Reservation |
| `**`                | Page Not Found  |

## Architecture

```
src/app
├── shared             # Base classes (entity, resource, response, assembler, endpoint, api), layout,
│                      # language switcher, Home and Page Not Found views
├── sports-centers     # Sports centers and reservations bounded context
│   ├── domain/model
│   ├── application    # SportsCentersStore (Signals)
│   ├── infrastructure # Resources, Request/Response, Assemblers, Endpoints and Api
│   └── presentation   # views/reservation-form, components/sports-center-summary(-list), routes
└── weather            # External API provider (Open-Meteo) bounded context
    ├── domain/model
    ├── application    # WeatherStore (Signals)
    ├── infrastructure
    └── presentation   # components/current-temperature
```
