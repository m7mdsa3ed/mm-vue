import Bugsnag from '@bugsnag/js'

if (import.meta.env.VITE_BUGSNAG_ENABLED) {
  Bugsnag.start(import.meta.env.VITE_BUGSNAG_API_KEY)
}
