import { cacheLife } from "next/cache";

export default async function CopyrightYear() {
  "use cache";
  cacheLife("days");

  return <>{new Date().getFullYear()}</>;
}
