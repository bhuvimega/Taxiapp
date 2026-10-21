import { cacheLife } from "next/cache";

/**
 * With `cacheComponents: true`, reading the current time during prerender is an
 * error. Caching it fixes that — the year only needs refreshing once a day.
 */
export default async function CopyrightYear() {
  "use cache";
  cacheLife("days");

  return <>{new Date().getFullYear()}</>;
}
