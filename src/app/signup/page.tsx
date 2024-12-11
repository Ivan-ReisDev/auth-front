import { FormCreateUser } from "@/components/FormCreateUser";

export default function SingUp() {

  return (
    <div className="flex w-dvw items-center justify-center h-dvh bg-slate-100">
      <div className="w-96 rounded bg-white p-6 shadow-lg">
        <FormCreateUser />
      </div>
    </div>
  );
}
