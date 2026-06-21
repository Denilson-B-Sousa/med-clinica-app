type AuthenticatedUser = {
  name?: string;
  nome?: string;
  user?: {
    name?: string;
    nome?: string;
  };
};

export function getAuthenticatedFirstName(
  user?: AuthenticatedUser | null,
  fallback = "Usuario",
) {
  const fullName = user?.name ?? user?.nome ?? user?.user?.name ?? user?.user?.nome;
  const firstName = fullName?.trim().split(/\s+/)[0];

  return firstName || fallback;
}
