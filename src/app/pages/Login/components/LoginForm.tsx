import { zodResolver } from "@hookform/resolvers/zod";
import googleIcon from "@/assets/google.svg";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useLoginUser } from "@/hooks/user/useLoginUser";
import { loginSchema, type LoginSchema } from "@/schemas/loginSchema";
import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export function LoginForm() {
  const API_URL = "http://localhost:8080";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const { mutateAsync } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleGoogleLogin() {
    window.location.href = `${API_URL}/auth/google`;
  }


  async function handleLogin(data: LoginSchema) {
    try {
      await mutateAsync(data);
      toast.success("Login realizado com sucesso.");

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      toast.error("Erro ao realizar login. Verifique suas credenciais e tente novamente.");
      console.error("Login error:", error);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col justify-center px-5 py-8 sm:px-8 lg:min-h-screen lg:py-4">
      <h1 className="py-4 text-2xl font-bold sm:text-3xl">Bem-vindo de volta!</h1>
      <span className="pb-4 text-slate-600">Por favor entre em sua conta.</span>
      {error === "google_user_not_registered" && (
        <p>Este e-mail do Google ainda não está cadastrado no sistema.</p>
      )}

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col justify-center gap-4"
      >
        <div>
          <label>Email</label>
          <Input
            variant="outlined"
            size="md"
            placeholder="Digite seu email"
            type="email"
            {...register("email")}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Senha</label>
          <div className="relative">
            <Input
              variant="outlined"
              size="md"
              placeholder="Digite sua senha"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className="pr-12"
              {...register("password")}
            />

            <button
              type="button"
              className="absolute top-1/2 right-4 flex -translate-y-1/2 cursor-pointer items-center text-[#0094CB] transition-colors hover:text-blue-700"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeSlash size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          primary
          size="md"
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Entrando ..." : "Entrar"}
        </Button>
      </form>

      <span className="flex justify-center py-2">——— OU ———</span>

      <Button google size="md" onClick={handleGoogleLogin} className="w-full">
        <img src={googleIcon} alt="Google" />
        <span>Continue com Google</span>
      </Button>

      <div className="flex justify-center pt-3 sm:justify-end">
        <Link to="/cadastro" className="text-sm text-[#0094CB] hover:underline">
          Não tem uma conta?
        </Link>
      </div>
    </div>
  );
}
