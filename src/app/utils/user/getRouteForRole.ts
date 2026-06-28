type RoleValue = string | { authority?: string | null; role?: string | null };

type UserWithRole = {
  role?: string | null;
  roles?: RoleValue[] | null;
  authority?: string | null;
  authorities?: RoleValue[] | null;
  profile?: UserWithRole | null;
  user?: UserWithRole | null;
  patient?: UserWithRole | null;
  doctor?: UserWithRole | null;
  admin?: UserWithRole | null;
};

function normalizeRole(role?: RoleValue | null) {
  if (!role) {
    return undefined;
  }

  if (typeof role === "string") {
    return role.toUpperCase();
  }

  return (role.role ?? role.authority)?.toUpperCase();
}

function getRoles(user?: UserWithRole | null): string[] {
  if (!user) {
    return [];
  }

  return [
    normalizeRole(user.role),
    normalizeRole(user.authority),
    ...(user.roles ?? []).map(normalizeRole),
    ...(user.authorities ?? []).map(normalizeRole),
    ...getRoles(user.profile),
    ...getRoles(user.user),
    ...getRoles(user.patient),
    ...getRoles(user.doctor),
    ...getRoles(user.admin),
  ].filter((role): role is string => Boolean(role));
}

export function getRouteForRole(user?: UserWithRole | null) {
  const roles = getRoles(user);

  if (roles.some((role) => role === "ADMIN" || role === "ROLE_ADMIN")) {
    return "/admin";
  }

  if (roles.some((role) => role === "PATIENT" || role === "ROLE_PATIENT")) {
    return "/home";
  }

  return "/home";
}
