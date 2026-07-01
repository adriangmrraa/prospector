"use client";

import { login } from "@/app/actions/auth";
import { useActionState, useState } from "react";
import { MapPin, Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-xl shadow-brand-500/25 mb-4">
            <MapPin className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Prospector</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Iniciá sesión para acceder al panel
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label htmlFor="username" className="text-sm font-medium">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
              placeholder="admin"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {state?.error && (
            <div className="px-3.5 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600 dark:text-red-400">
              {state.error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/35 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Ingresando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Ingresar
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
