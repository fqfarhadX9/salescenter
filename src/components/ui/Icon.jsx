import {
  Award,
  BadgePercent,
  Baby,
  Building2,
  CalendarCheck,
  Dumbbell,
  Gem,
  Globe2,
  Handshake,
  Home,
  LayoutGrid,
  MapPin,
  Palmtree,
  Plane,
  ShieldCheck,
  Sun,
  Tag,
  TrainFront,
  Trees,
  TrendingUp,
  Wallet,
  Waves,
} from 'lucide-react'

/**
 * Maps icon names used in siteConfig to lucide components, so content
 * stays plain data. Add new icons here when you reference them in config.
 */
const ICONS = {
  Award,
  BadgePercent,
  Baby,
  Building2,
  CalendarCheck,
  Dumbbell,
  Gem,
  Globe2,
  Handshake,
  Home,
  LayoutGrid,
  MapPin,
  Palmtree,
  Plane,
  ShieldCheck,
  Sun,
  Tag,
  TrainFront,
  Trees,
  TrendingUp,
  Wallet,
  Waves,
}

export default function Icon({ name, ...props }) {
  const Component = ICONS[name] ?? Gem
  return <Component aria-hidden="true" strokeWidth={1.5} {...props} />
}
