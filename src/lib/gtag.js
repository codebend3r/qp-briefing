export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value, nonInteractive }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    nonInteractive: nonInteractive ?? false,
  })
}

// https://developers.google.com/analytics/devguides/collection/ga4/user-id?technology=gtagjs
export const identify = ({ userId }) => {
  window.gtag("config", GA_TRACKING_ID, {
    user_id: userId,
  })
  window.gtag("set", "user_properties", {
    crm_id: userId,
  })
}
