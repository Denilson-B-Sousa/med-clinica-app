import { BrandLogo, LoginBenefitsPanel, LoginForm } from "./components";

export function Login() {
  return (
    <main className="min-h-screen bg-white">
      <BrandLogo />
      <section className="grid min-h-screen grid-cols-1 pt-20 lg:grid-cols-2 lg:pt-0">
        <LoginForm />
        <LoginBenefitsPanel />
      </section>
    </main>
  );
}
