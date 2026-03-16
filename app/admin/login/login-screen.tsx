import Link from "next/link";
import { Activity } from "lucide-react";

import { LoginForm } from "./login-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LoginScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <div className="mb-8 flex items-center gap-3 text-emerald-300">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10">
          <Activity className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">NKMK Admin</p>
          <p className="text-xl font-semibold text-white">Bug Hunter Access</p>
        </div>
      </div>

      <div className="w-full max-w-md">
        <LoginForm />
        <p className="mt-6 text-center text-sm text-slate-400">
          <span>Нужен доступ? </span>
          <Link href="mailto:security@nkmk.uz" className={cn(buttonVariants({ variant: "link" }), "h-auto px-1 text-emerald-300")}>
            security@nkmk.uz
          </Link>
        </p>
      </div>
    </div>
  );
}
