# Google Analytics & Reporting Setup

This file explains how to set up Google Analytics (GA4) for the site and how to use the included reporting script.

## 1) Create a GA4 property

1. Go to https://analytics.google.com and sign in with your Google account.
2. Create a new GA4 property for `dialadriverhermanus.co.za`.
3. Copy the Measurement ID (looks like `G-XXXXXXXXXX`).

## 2) Enable analytics in the app

- Create a `.env` file in the project root with the Measurement ID:

```env
VITE_GA_ID=G-XXXXXXXXXX
GA4_PROPERTY_ID=123456789
```

- Restart the dev server or rebuild the project:

```powershell
npm run dev
# or
npm run build
```

The footer will show `Analytics: Enabled` when `VITE_GA_ID` is set.

## 3) (Optional) Automated monthly CSV reports using a service account

To generate automated monthly CSV reports we use the Google Analytics Data API and a service account.

Steps:

1. In Google Cloud Console, create a new project or reuse an existing one.
2. Enable the **Google Analytics Data API** for the project.
3. Create a **Service Account** and generate a JSON key. Download the JSON.
4. In Google Analytics admin for the GA4 property, go to **Property Access Management** and add the service account email with the **Viewer** role (or at least read access).
5. On your machine, set the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to the path of the JSON key file, or set `SERVICE_ACCOUNT_KEY` to the raw JSON contents.
6. Set the property ID as `GA4_PROPERTY_ID` env var (numeric).

Example (PowerShell):

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = "C:\path\to\service-account.json"
$env:GA4_PROPERTY_ID = "123456789"
node scripts/generate-ga4-report.js --month=2026-01
```

The script will write `./reports/report-YYYY-MM.csv` with date-level metrics.

## 4) Connect to Looker Studio (Data Studio)

- Use Looker Studio to connect directly to your GA4 property and build dashboards.
- Or use the CSVs produced by the script to push data into sheets or other BI tools.

## Notes
- Never share your Google account password. Use service accounts for programmatic access and share only the JSON key securely.
- If you prefer, I can prepare a Looker Studio template you can copy and connect to your GA property.
