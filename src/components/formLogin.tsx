"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Informe um e-mail válido" })
    .nonempty({ message: "E-mail é obrigatório" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function FormLogin() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (response?.ok) {
        router.push("/dashboard");
      } else {
        toast.error("Erro!",{description: "Usuário ou senha incorretos"});
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro!",{description: "Usuário ou senha incorretos"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <h1 className="font-bold w-full text-center">Login</h1>
        {errorMessage && (
          <div className="text-red-600 text-sm">{errorMessage}</div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu e-mail" {...field} />
              </FormControl>
              <FormDescription>Entre com seu e-mail.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  {...field}
                />
              </FormControl>
              <FormDescription>Entre com sua senha de acesso.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-around">

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Login"}
        </Button>
        <Link
          href={'/signup'}
          >
          Registrar 
        </Link>
          </div>
      </form>
    </Form>
  );
}
