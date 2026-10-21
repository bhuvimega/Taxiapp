import { ChevronDown, type LucideIcon } from "lucide-react";

type FieldProps = {
  label: string;
  /** Optional brand-coloured icon shown inside the left of the control. */
  icon?: LucideIcon;
  /** Extra classes for the icon, e.g. "text-highlight" to recolour it. */
  iconClassName?: string;
  /** Set when the child is a <select> — adds the chevron and hides the native arrow. */
  select?: boolean;
  /** Validation message. Shows in red under the control. */
  error?: string;
  /** A plain <input>, <select> or <textarea>. Styling comes from .field-control in globals.css. */
  children: React.ReactNode;
};

/**
 * Label + control + optional icons + optional error.
 * The control is wrapped in a <label>, so clicking the text focuses the input
 * and screen readers announce the name — no id/htmlFor wiring needed.
 */
export default function Field({
  label,
  icon: Icon,
  iconClassName = "",
  select = false,
  error,
  children,
}: FieldProps) {
  return (
    <label className="block min-w-0">
      <span className="field-label">{label}</span>

      <span
        className="field-control"
        data-icon={Icon ? "" : undefined}
        data-select={select ? "" : undefined}
        data-invalid={error ? "" : undefined}
      >
        {Icon && (
          <Icon size={16} aria-hidden="true" className={`field-icon field-icon-start ${iconClassName}`} />
        )}
        {children}
        {select && (
          <ChevronDown size={16} aria-hidden="true" className="field-icon field-icon-end" />
        )}
      </span>

      {error && (
        <span role="alert" className="field-error">
          {error}
        </span>
      )}
    </label>
  );
}
