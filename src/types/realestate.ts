export type LeadStatusType =
  | "NEW"
  | "QUALIFYING"
  | "QUALIFIED"
  | "VISIT_SCHEDULED"
  | "HANDOFF_PENDING"
  | "IN_ATTENDANCE"
  | "PROPOSAL"
  | "CLOSED_WON"
  | "LOST";

export type LeadObjectiveType = "COMPRAR" | "ALUGAR" | "INVESTIR";

export type LeadSourceType = "META_ADS" | "ZAP_IMOVEIS" | "SITE_CHAT" | "WHATSAPP";

export interface PropertyCardData {
  id: string;
  code: string;
  slug: string;
  title: string;
  description?: string;
  price: number;
  neighborhood: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  suites: number;
  parkingSpots?: number;
  areaSqm: number;
  oceanView: boolean;
  imageUrl: string;
  gallery?: string[];
  objective?: LeadObjectiveType;
}

export interface BrokerSummary {
  id: string;
  name: string;
  creci: string;
  avatarUrl?: string | null;
  online?: boolean;
  specialties?: string[];
}

export interface LeadCardData {
  id: string;
  name: string;
  phone: string;
  source: LeadSourceType;
  status: LeadStatusType;
  objective?: LeadObjectiveType | null;
  budgetMax?: number | null;
  preferredNeighborhood?: string | null;
  propertyTitle?: string | null;
  propertyThumbnail?: string | null;
  score: number;
  assignedBroker?: BrokerSummary | null;
  handoffAt?: string | null;
  assumedAt?: string | null;
  slaBreached: boolean;
  createdAt?: string;
  updatedAt: string;
}

export interface ChatBubbleMessage {
  id: string;
  sender: "AI" | "USER" | "SYSTEM";
  content: string;
  timestamp: string;
  propertyCards?: PropertyCardData[];
}

export interface NeighborhoodItem {
  name: string;
  imageUrl: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: "success" | "warning" | "info";
}
