import googleIcon from "@/assets/google.svg";
import { Calendar, ShieldCheck, User } from "phosphor-react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <>
      <h1 className="absolute top-4 left-12 text-2xl font-bold">
        <a href="#">
          Med<span className="text-[#0094CB]">Clínica</span>
        </a>
      </h1>
      <section className="grid grid-cols-2 h-screen">
        <div className="flex flex-col w-lg m-auto py-4 px-8">
          <h1 className="text-3xl py-4 font-bold">Bem-vindo de volta!</h1>
          <span className="pb-4">Por favor entre em sua conta.</span>

          <form className="flex flex-col justify-center gap-4">
            <div>
              <label>Email</label>
              <Input
                variant="outlined"
                size="md"
                placeholder="Digite seu email"
                type="email"
              />
            </div>
            <div>
              <label>Senha</label>
              <Input
                variant="outlined"
                size="md"
                placeholder="Digite sua senha"
                type="password"
              />
            </div>

            <div>
              <a href="#" className="text-sm text-[#0094CB] hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <Button primary size="md">
              Entrar
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
        <aside className="relative flex items-center justify-center bg-[url('/bg-login.png')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-[#0094CB]/60" />

          <div className="relative z-10 flex flex-col gap-8 text-white max-w-md px-10">
            <div className="flex items-start gap-4">
              <Calendar className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="font-bold text-lg">
                  Agendamento fácil e rápido
                </h3>
                <p className="text-sm text-white/90">
                  Marque sua consulta em poucos cliques!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <User className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Acompanhamento Completo</h3>
                <p className="text-sm text-white/90">
                  Tenha acesso ao seu histórico de saúde!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Segurança e Privacidade</h3>
                <p className="text-sm text-white/90">
                  Seus dados são protegidos com tecnologia de ponta!
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
