// @ts-nocheck
import { getRequestConfig } from 'next-intl/server';

const SUPPORTED = ['en', 'de', 'bg'];
const DEFAULT = 'en';

export default getRequestConfig(({ locale }) => {
  const active = SUPPORTED.includes(locale) ? locale : DEFAULT;

  // ✅ Always return a locale, even if undefined
  if (!active) {
    console.warn('⚠ No locale passed to getRequestConfig, using default:', DEFAULT);
  }

  return import(`./src/locales/${active}.json`)
    .then(mod => ({ locale: active, messages: mod.default }))
    .catch(err => {
      console.error(`❌ Could not load messages for "${active}"`, err);
      return { locale: active, messages: {} };
    });
});
