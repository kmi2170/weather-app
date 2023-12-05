export const GA_TRACKING_ID = process.env.GA_TRACKING_ID; // This is your GA Tracking ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  //if (typeof window !== 'undefined') {
  if (window && window.gtag) {
    window.gtag("config", GA_TRACKING_ID as string, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type eventParams = Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams;
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action as string, {
    event_category: category as eventParams,
    event_label: label as eventParams,
    value: value as eventParams,
  });
};
