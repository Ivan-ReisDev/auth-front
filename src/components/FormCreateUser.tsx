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
import axiosInstance from "@/lib/axios/axiosInstance";
import Link from "next/link";
import { AxiosError } from "axios";

const formSchema = z
  .object({
    name: z.string().nonempty({ message: "O nome é obrigatório" }),
    email: z
      .string()
      .email({ message: "Informe um e-mail válido" })
      .nonempty({ message: "E-mail é obrigatório" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof formSchema>;

export function FormCreateUser() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    setLoading(true);
    setErrorMessage(null);
  
    try {
      const response = await axiosInstance.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
  
      if (response.status === 201) {
        router.push("/dashboard");
        toast.success("Sucesso!", { description: "Usuários criado com sucesso" });
      } else {
        toast.error("Error!", { description: response.data?.message });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error("Error!", { description: error.response?.data?.message });
      } else if (error instanceof Error) {
        toast.error("Error!", { description: error.message });
      } else {
        toast.error("Error!", { description: "Ocorreu um erro desconhecido." });
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {errorMessage && (
          <div className="text-red-600 text-sm">{errorMessage}</div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormDescription>Informe seu nome completo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu e-mail" {...field} />
              </FormControl>
              <FormDescription>Informe um e-mail válido.</FormDescription>
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
              <FormDescription>A senha deve ter pelo menos 6 caracteres.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
                  {...field}
                />
              </FormControl>
              <FormDescription>Repita a senha para confirmação.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-around">

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar Usuário"}
          </Button>

          <Link
            href={'/'}
          >
            Voltar
          </Link>
        </div>
      </form>
    </Form>
  );
}



