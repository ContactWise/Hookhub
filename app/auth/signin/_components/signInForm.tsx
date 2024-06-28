"use client";

import { signInSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import Typography from "@/components/custom/typography";
import { PasswordInput } from "@/components/custom/passwordInput";
import { signIn } from "next-auth/react";
import { useEnvironmentContext } from "@/context/envContext";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTenants } from "@/queries/getUserDetails";

type SignInFormValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const { setTenant, setWorkspace } = useEnvironmentContext();
  const router = useRouter();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
  });

  const {
    data: tenantsData,
    isFetched: isTenantsFetched,
    error: tenantsDataError,
    isLoading: isTenantsLoading,
    refetch,
  } = useQuery({
    queryKey: ["getTenants"],
    queryFn: () => getTenants(),
    enabled: false,
  });

  const onSubmit = async (data: SignInFormValues) => {
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res!.status === 200) {
      return router.push("/dashboard/applications");
    }

    return toast(<div>Error Signing In</div>);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex-col mt-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {" "}
                <Typography className="text-sm" variant={"formFieldTitle"}>
                  Email
                </Typography>
              </FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {" "}
                <Typography className="text-sm" variant={"formFieldTitle"}>
                  Password
                </Typography>
              </FormLabel>
              <FormControl>
                {/* <Input type="password" {...field} /> */}
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-6" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
