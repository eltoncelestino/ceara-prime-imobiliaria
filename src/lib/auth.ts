export type UserRole = "MANAGER" | "BROKER";

export interface CrmSession {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  creci?: string;
}

export const SESSION_COOKIE_NAME = "cp_crm_session";

const DEMO_USERS: Record<string, CrmSession & { password: string }> = {
  "roberto.viana@cearaprime.com.br": {
    userId: "mgr-roberto",
    name: "Roberto Viana",
    email: "roberto.viana@cearaprime.com.br",
    role: "MANAGER",
    password: "prime2026",
  },
  "carlos.eduardo@cearaprime.com.br": {
    userId: "b1",
    name: "Carlos Eduardo",
    email: "carlos.eduardo@cearaprime.com.br",
    role: "BROKER",
    creci: "15423-F",
    password: "prime2026",
  },
};

export function authenticateCrmUser(
  email: string,
  password: string
): CrmSession | null {
  const user = DEMO_USERS[email.trim().toLowerCase()];
  if (!user || user.password !== password) return null;
  return {
    userId: user.userId,
    name: user.name,
    email: user.email,
    role: user.role,
    creci: user.creci,
  };
}

export function encodeSession(session: CrmSession): string {
  return Buffer.from(JSON.stringify(session), "utf-8").toString("base64url");
}

export function decodeSession(token?: string | null): CrmSession | null {
  if (!token) return null;
  try {
    const json = Buffer.from(token, "base64url").toString("utf-8");
    const parsed = JSON.parse(json) as CrmSession;
    if (parsed?.userId && parsed?.role) return parsed;
    return null;
  } catch {
    return null;
  }
}
