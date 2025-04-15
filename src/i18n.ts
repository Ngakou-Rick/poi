import { getRequestConfig } from 'next-intl/server';
import type { GetRequestConfigParams } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
  // Validate that the incoming locale is valid
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale;
  
  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}/index.json`)).default
  };
});
