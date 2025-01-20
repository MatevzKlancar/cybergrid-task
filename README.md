# CybergridFrontend - Energy Asset Management Dashboard

A real-time energy asset monitoring dashboard built with Angular 19 and Apache ECharts.

## Overview

This application provides a dashboard for monitoring energy assets (PV, Wind, Battery) and their real-time data. The backend is currently mocked for demonstration purposes.

## Features

- 🔐 User authentication (mocked)
- 📊 Real-time asset monitoring
- 📈 Interactive charts using Apache ECharts
- 📱 Responsive design
- 📋 Tabular data view
- 🎨 Material Design integration

## Technical Documentation

### Architecture

The application follows a modular architecture with these key components:

```
src/
├── app/
│   ├── core/              # Core functionality
│   │   ├── models/        # Data models
│   │   ├── services/      # Services
│   │   └── guards/        # Route guards
│   ├── features/          # Feature modules
│   │   ├── auth/          # Authentication
│   │   └── dashboard/     # Main dashboard
│   └── shared/           # Shared components
```

### Mocked Backend Services

The application uses the following mocked services:

1. **Authentication Service**

   - Simulates user login/logout
   - Stores session in localStorage
   - Default credentials: any email/password combination

2. **Energy Asset Service**
   - Provides mock energy asset data
   - Generates random timeseries data
   - Simulates network delays and errors

### Data Models

1. **Energy Asset**

   ```typescript
   interface EnergyAsset {
     id: string;
     name: string;
     type: "PV" | "Wind" | "Battery";
     maxCapacity: number;
     targetEfficiency: number;
     currentValues: {
       activePower: number;
       reactivePower: number;
       voltage: number;
       efficiency: number;
       powerFactor: number;
     };
   }
   ```

2. **Timeseries Data**
   ```typescript
   interface EnergyAssetTimeseries {
     assetId: string;
     timestamp: string;
     activePower: number;
     voltage: number;
   }
   ```

### Charts and Visualizations

The dashboard uses Apache ECharts for data visualization:

1. **Efficiency Gauge**

   - Displays current efficiency
   - Updates in real-time
   - Color-coded indicators

2. **Daily Trend Chart**
   - 24-hour power trend
   - Dual Y-axis for power and voltage
   - Interactive tooltips

## Development Setup

1. **Prerequisites**

   - Node.js (v18 or higher)
   - npm (v9 or higher)
   - Angular CLI (v19.1.1)

2. **Installation**

   ```bash
   git clone https://github.com/MatevzKlancar/cybergrid-frontend.git
   cd cybergrid-frontend
   npm install
   ```

3. **Running the Application**

   ```bash
   npm start
   ```

   Navigate to `http://localhost:4200`

4. **Building for Production**
   ```bash
   npm run build
   ```

## Testing

The application includes unit tests for components and services:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --code-coverage
```

## Deployment

The application is configured for deployment on Vercel:

1. **Live Demo**: [https://cybergrid-task.vercel.app](https://cybergrid-task.vercel.app)
2. **Automatic Deployments**: Connected to main branch
3. **Build Command**: `npm run vercel-build`
