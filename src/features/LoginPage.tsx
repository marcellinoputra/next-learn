"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username Minimal 3 Karakter")
    .max(16, "Username Maximal 16 Karakter"),

  password: z.string().min(8, "Password Minimal 8 Karakter"),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const LoginPage: React.FC = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit((values) => {
    alert(`Username: ${values.username} || Password: ${values.password}`);
  });
  return (
    <main className="flex flex-col justify-center items-center max-w-screen-md min-h-screen mx-auto py-4 px-8">
      <Form {...form}>
        <form className="w-full max-w-[540px]" onSubmit={onSubmit}>
          <Card className="my-10">
            <CardHeader>
              <CardTitle>Welcome Back!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={control}
                name="username"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-4 w-full">
                <Button type="submit">Login</Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default LoginPage;
