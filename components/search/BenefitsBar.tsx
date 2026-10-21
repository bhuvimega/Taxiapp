import { Headset, IndianRupee, ShieldCheck } from "lucide-react";

const benefits = [
  { title: "Book Now", text: "at Zero Cost", icon: IndianRupee },
  { title: "Free Cancellations", text: "Up to 6 hours before pickup", icon: ShieldCheck },
  { title: "24x7 Customer", text: "Support", icon: Headset },
];

export default function BenefitsBar() {
  return (
    <ul className="grid grid-cols-1 gap-4 rounded-xl bg-brand-dark px-6 py-4 text-white sm:grid-cols-3">
      {benefits.map(({ title, text, icon: Icon }) => (
        <li key={title} className="flex items-center gap-3 sm:justify-center">
          <Icon size={30} strokeWidth={1.6} aria-hidden="true" />
          <span className="text-xs font-semibold leading-4">
            {title}
            <br />
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}
