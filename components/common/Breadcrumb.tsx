import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

/** Home > Select Car. The last item (no href) is the current page. */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-xs text-muted-foreground">
        {items.map(({ label, href }, i) => (
          <li key={label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
            {href ? (
              <Link href={href} className="link-muted">
                {label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-foreground">
                {label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
