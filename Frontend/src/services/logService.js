import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://7909baa243c54c70b4b5dc99dd69c9e8@o575506.ingest.sentry.io/5930699",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
  console.log(error);
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  init,
  log,
};
