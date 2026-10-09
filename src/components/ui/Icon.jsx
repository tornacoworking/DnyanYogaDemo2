/**
 * Icon.jsx
 * Shows a lucide-react icon from its name written as text in the /src/data files
 * (e.g. icon: "Search" in services.js).
 * Used on: service, category, industry, process and value cards.
 *
 * WHY A FIXED LIST: importing every lucide icon would make the build slow and big.
 * Only the icons listed here are included. To use a new icon in /src/data, find its name
 * on https://lucide.dev/icons, import it below and add it to ICONS.
 */
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Brush,
  Building2,
  Camera,
  Check,
  Clapperboard,
  ClipboardCheck,
  Clock,
  Code,
  Compass,
  Factory,
  FileText,
  Fingerprint,
  Glasses,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hotel,
  LayoutDashboard,
  Layers,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  Mic,
  Monitor,
  MousePointerClick,
  Newspaper,
  Package,
  Palette,
  PenTool,
  Phone,
  Play,
  Printer,
  Quote,
  Rocket,
  Search,
  Shapes,
  Share2,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Target,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";

/** Map of icon name (as written in /src/data) → icon component. */
const ICONS = {
  ArrowRight,
  BookOpen,
  Briefcase,
  Brush,
  Building2,
  Camera,
  Check,
  Clapperboard,
  ClipboardCheck,
  Clock,
  Code,
  Compass,
  Factory,
  FileText,
  Fingerprint,
  Glasses,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hotel,
  LayoutDashboard,
  Layers,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  Mic,
  Monitor,
  MousePointerClick,
  Newspaper,
  Package,
  Palette,
  PenTool,
  Phone,
  Play,
  Printer,
  Quote,
  Rocket,
  Search,
  Shapes,
  Share2,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Target,
  TrendingUp,
  Users,
  Video,
};

/**
 * Renders an icon by name. Unknown names fall back to the Sparkles icon instead of crashing.
 * Icons are decorative (aria-hidden), so screen readers skip them; the text next to them
 * carries the meaning.
 * @param {Object} props
 * @param {string} props.name        Icon name, e.g. "Search"
 * @param {string} [props.className] Tailwind classes for size and colour
 * @param {number} [props.strokeWidth=1.75] Line thickness
 */
export default function Icon({ name, className = "h-6 w-6", strokeWidth = 1.75 }) {
  const IconComponent = ICONS[name] || Sparkles;
  return <IconComponent className={className} strokeWidth={strokeWidth} aria-hidden="true" focusable="false" />;
}
