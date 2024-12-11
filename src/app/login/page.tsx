import { FormLogin } from "@/components/formLogin";

export default function Login() {

  return (
    <div className="flex w-dvw items-center justify-center h-dvh bg-slate-100">
      <div className="w-96 rounded bg-white p-6 shadow-lg">
        <FormLogin />
      </div>
    </div>
  );
}
