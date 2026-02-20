import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
 
export default getRequestConfig(async () => {
  const supportedLocales = ['az', 'en'];
 
  let locale = (await cookies()).get("WAYLANG_LOCALE")?.value || "az";
 
  if (!supportedLocales.includes(locale)) {
    locale = 'az';
  }
 
  const messages = (await import(`../messages/${locale}.json`)).default;
 
  return {
    locale,
    messages
  };
});