import { BrandLogo, LoginBenefitsPanel, LoginForm } from "./components";

export function Login() {
  return (
    <>
      <BrandLogo />
      <section className="grid h-screen grid-cols-2">
        <LoginForm />
        <LoginBenefitsPanel />
      </section>
    </>
  );
}
