"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";
import Field from "@/components/common/Field";
import { useTrip } from "@/components/providers/TripProvider";
import {
  SEARCH_PATH,
  airports,
  popularCities,
  tripTabs,
  type TripType,
} from "@/config/booking";

/* ------------------------------------------------------------------ */
/* Types + helpers                                                     */
/* ------------------------------------------------------------------ */

type FormState = {
  from: string; // pickup city (also "City" on the Local tab)
  to: string;
  pickupAt: string; // datetime-local  "2026-10-20T18:35"
  returnAt: string; // datetime-local
  date: string; // date            "2026-10-20"
  time: string; // time            "18:35"
  trip: "drop" | "pickup"; // airport: drop TO airport / pickup FROM airport
  airport: string;
  address: string;
};

type FieldKey = keyof FormState;
type Errors = Partial<Record<FieldKey, string>>;

const initialState: FormState = {
  from: "",
  to: "",
  pickupAt: "",
  returnAt: "",
  date: "",
  time: "",
  trip: "drop",
  airport: "",
  address: "",
};

const pad = (n: number) => String(n).padStart(2, "0");

/** "2026-10-20" or "2026-10-20T18:35" in the visitor's local time zone. Browser-only. */
function localISO(d: Date, withTime: boolean) {
  const day = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  return withTime ? `${day}T${pad(d.getHours())}:${pad(d.getMinutes())}` : day;
}

/** Callback refs set the earliest selectable value once the input is in the browser. */
const minDate = (el: HTMLInputElement | null) => {
  if (el) el.min = localISO(new Date(), false);
};
const minDateTime = (min?: string) => (el: HTMLInputElement | null) => {
  if (el) el.min = min || localISO(new Date(), true);
};

const isPast = (value: string) => new Date(value).getTime() < Date.now();

function validate(type: TripType, f: FormState): Errors {
  const e: Errors = {};

  if (type === "one-way" || type === "round-trip") {
    if (!f.from.trim()) e.from = "Enter pickup city";
    if (!f.to.trim()) e.to = "Enter drop city";
    else if (f.from.trim().toLowerCase() === f.to.trim().toLowerCase())
      e.to = "Drop must differ from pickup";

    if (!f.pickupAt) e.pickupAt = "Choose pickup date & time";
    else if (isPast(f.pickupAt)) e.pickupAt = "Pickup time is in the past";

    if (type === "round-trip") {
      if (!f.returnAt) e.returnAt = "Choose return date & time";
      else if (f.pickupAt && f.returnAt <= f.pickupAt)
        e.returnAt = "Return must be after pickup";
    }
    return e;
  }

  if (type === "local") {
    if (!f.from.trim()) e.from = "Enter your city";
  } else {
    if (!f.airport) e.airport = "Select an airport";
    if (!f.address.trim())
      e.address = f.trip === "drop" ? "Enter pickup address" : "Enter drop address";
  }

  if (!f.date) e.date = "Choose a pick up date";
  if (!f.time) e.time = "Choose a pick up time";
  else if (f.date && isPast(`${f.date}T${f.time}`)) e.time = "Time is in the past";

  return e;
}

/** Only the fields that matter for the chosen tab go into the URL. */
function toSearchParams(type: TripType, f: FormState) {
  const p = new URLSearchParams({ type });

  if (type === "one-way" || type === "round-trip") {
    p.set("from", f.from.trim());
    p.set("to", f.to.trim());
    p.set("pickup", f.pickupAt);
    if (type === "round-trip") p.set("return", f.returnAt);
  } else {
    if (type === "local") p.set("city", f.from.trim());
    else {
      p.set("direction", f.trip);
      p.set("airport", f.airport);
      p.set("address", f.address.trim());
    }
    p.set("date", f.date);
    p.set("time", f.time);
  }

  return p;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function BookingForm() {
  const router = useRouter();
  const uid = useId();
  const citiesId = `${uid}-cities`;

  // The selected tab is shared with the header menu (see TripProvider).
  const { trip: tab, selectTrip } = useTrip();
  const [form, setForm] = useState<FormState>(initialState);

  // Errors remember which tab they belong to, so switching tab (from the form
  // OR from the header menu) never shows another tab's messages.
  const [errorState, setErrorState] = useState<{ tab: TripType; items: Errors }>({
    tab: "one-way",
    items: {},
  });
  const errors: Errors = errorState.tab === tab ? errorState.items : {};

  const activeTab = tripTabs.find((t) => t.id === tab) ?? tripTabs[0];

  const set =
    (key: FieldKey) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrorState((prev) => ({ ...prev, items: { ...prev.items, [key]: undefined } }));
    };

  const swapLocations = () =>
    setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }));

  const selectTab = (id: TripType) => selectTrip(id);

  /** Arrow keys move between tabs (WAI-ARIA tabs pattern). */
  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const index = tripTabs.findIndex((t) => t.id === tab);
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tripTabs.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + tripTabs.length) % tripTabs.length;
    else return;

    e.preventDefault();
    selectTab(tripTabs[next].id);
    document.getElementById(`${uid}-tab-${tripTabs[next].id}`)?.focus();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(tab, form);
    setErrorState({ tab, items: found });
    if (Object.keys(found).length > 0) return;

    router.push(`${SEARCH_PATH}?${toSearchParams(tab, form).toString()}`);
  };

  /* ---- reusable field blocks ---- */

  const pickupDateField = (
    <Field label="Pick up date" icon={CalendarDays} error={errors.date}>
      <input type="date" ref={minDate} value={form.date} onChange={set("date")} />
    </Field>
  );

  const pickupTimeField = (
    <Field label="Pick up time" icon={Clock3} error={errors.time}>
      <input type="time" value={form.time} onChange={set("time")} />
    </Field>
  );

  const airportSelect = (label: string) => (
    <Field label={label} select error={errors.airport}>
      <select value={form.airport} onChange={set("airport")}>
        <option value="" disabled>
          Select airport
        </option>
        {airports.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </Field>
  );

  const addressInput = (label: string) => (
    <Field label={label} icon={MapPin} error={errors.address}>
      <input
        type="text"
        placeholder="Enter pickup location"
        autoComplete="off"
        value={form.address}
        onChange={set("address")}
      />
    </Field>
  );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      id="booking"
      className="mt-10 scroll-mt-24 overflow-hidden rounded-[22px] bg-card shadow-xl"
    >
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Trip type"
        className="booking-tabs"
        onKeyDown={onTabKeyDown}
      >
        {tripTabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`${uid}-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={tab === id}
            aria-controls={`${uid}-panel`}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => selectTab(id)}
            className="booking-tab"
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-7">
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${tab}`}
        >
          <p className="text-sm text-muted-foreground">{activeTab.description}</p>

          <datalist id={citiesId}>
            {popularCities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>

          {/* ---------- One-way + Round-trip ---------- */}
          {(tab === "one-way" || tab === "round-trip") && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
                <Field label="Pickup city" icon={MapPin} error={errors.from}>
                  <input
                    type="text"
                    list={citiesId}
                    placeholder="Search city"
                    autoComplete="off"
                    value={form.from}
                    onChange={set("from")}
                  />
                </Field>

                <button
                  type="button"
                  onClick={swapLocations}
                  aria-label="Swap pickup and drop"
                  className="swap-btn right-3 top-[80px] -translate-y-1/2 sm:left-1/2 sm:right-auto sm:top-12 sm:-translate-x-1/2"
                >
                  <ArrowLeftRight size={16} className="rotate-90 sm:rotate-0" aria-hidden="true" />
                </button>

                <Field
                  label="Drop city"
                  icon={MapPin}
                  iconClassName="text-highlight"
                  error={errors.to}
                >
                  <input
                    type="text"
                    list={citiesId}
                    placeholder="Search destination"
                    autoComplete="off"
                    value={form.to}
                    onChange={set("to")}
                  />
                </Field>
              </div>

              <Field label="Pickup date & time" icon={CalendarDays} error={errors.pickupAt}>
                <input
                  type="datetime-local"
                  ref={minDateTime()}
                  value={form.pickupAt}
                  onChange={set("pickupAt")}
                />
              </Field>

              {tab === "round-trip" && (
                <Field
                  label="Return date & time"
                  icon={CalendarDays}
                  iconClassName="text-info"
                  error={errors.returnAt}
                >
                  <input
                    type="datetime-local"
                    ref={minDateTime(form.pickupAt)}
                    value={form.returnAt}
                    onChange={set("returnAt")}
                  />
                </Field>
              )}
            </div>
          )}

          {/* ---------- Airport transfer ---------- */}
          {tab === "airport" && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Field label="Trip" select>
                <select value={form.trip} onChange={set("trip")}>
                  <option value="drop">Drop to Airport</option>
                  <option value="pickup">Pickup from Airport</option>
                </select>
              </Field>

              {form.trip === "drop" ? (
                <>
                  {addressInput("Pickup address")}
                  {airportSelect("Drop airport")}
                </>
              ) : (
                <>
                  {airportSelect("Pickup airport")}
                  {addressInput("Drop address")}
                </>
              )}

              {pickupDateField}
              {pickupTimeField}
            </div>
          )}

          {/* ---------- Local / hourly ---------- */}
          {tab === "local" && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="City" icon={MapPin} error={errors.from}>
                <input
                  type="text"
                  list={citiesId}
                  placeholder="Search city"
                  autoComplete="off"
                  value={form.from}
                  onChange={set("from")}
                />
              </Field>

              {pickupDateField}
              {pickupTimeField}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-accent btn-cta mt-6">
          Search Cabs
          <ArrowRight size={18} aria-hidden="true" />
        </button>

        <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
          Transparent platform-calculated fare · Free cancellation up to 6 hrs before pickup
        </p>
      </div>
    </form>
  );
}
