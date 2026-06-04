import { zodResolver } from "@hookform/resolvers/zod";
import googleIcon from "@/assets/google.svg";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useLoginUser } from "@/hooks/user/useLoginUser";
import { loginSchema, type LoginSchema } from "@/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const { mutateAsync } = useLoginUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginSchema) {
    try {
      await mutateAsync(data);
      navigate("/cadastro");
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div className="m-auto flex w-lg flex-col px-8 py-4">
      <h1 className="py-4 text-3xl font-bold">Bem-vindo de volta!</h1>
      <span className="pb-4">Por favor entre em sua conta.</span>

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
          <Input
            variant="outlined"
            size="md"
            placeholder="Digite sua senha"
            type="password"
            {...register("password")}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <a href="#" className="text-sm text-[#0094CB] hover:underline">
            Esqueceu a senha?
          </a>
        </div>

        <Button primary size="md" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando ..." : "Entrar"}
        </Button>
      </form>

      <span className="flex justify-center py-2">——— OU ———</span>

      <Button google size="md">
        <img src={googleIcon} alt="Google" />
        <span>Continue com Google</span>
      </Button>

      <div className="flex justify-end pt-2">
        <Link to="/cadastro" className="text-sm text-[#0094CB] hover:underline">
          Não tem uma conta?
        </Link>
      </div>
    </div>
  );
}
