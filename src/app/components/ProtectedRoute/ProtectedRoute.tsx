import { useMe } from "@/hooks/useMe";
import {
  getRouteForRole,
  hasAnyRole,
  type UserWithRole,
} from "@/utils/user/getRouteForRole";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  allowedRoles: string[];
};

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const { data, isLoading, isError } = useMe();
  const user = data as UserWithRole | undefined;

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p role="status">Verificando acesso...</p>
      </main>
    );
  }

  if (isError || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (!hasAnyRole(user, allowedRoles)) {
    return <Navigate to={getRouteForRole(user)} replace />;
  }

  return <Outlet />;
}
