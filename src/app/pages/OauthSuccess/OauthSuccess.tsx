import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMe } from "@/hooks/useMe";
import { getRouteForRole } from "@/utils/user/getRouteForRole";

export function OAuthSuccess() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useMe();

  useEffect(() => {
    if (data) {
      navigate(getRouteForRole(data), { replace: true });
    }
  }, [data, navigate]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  if (isLoading) {
    return <p>Entrando...</p>;
  }

  return null;
}
