import { cn } from "@/lib/utils"
import { forwardRef, HTMLAttributes } from "react"

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "subtle"
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base glassmorphic styles
          "relative rounded-2xl border backdrop-blur-md transition-all duration-300",
          // Variant styles
          {
            "bg-glass-bg/80 border-glass-border shadow-[var(--shadow-glass)] hover:shadow-[var(--shadow-glass-hover)]": 
              variant === "default",
            "bg-glass-bg/90 border-glass-border shadow-[var(--shadow-glass-hover)] hover:shadow-[0_16px_48px_hsla(var(--glass-shadow),0.2)]": 
              variant === "elevated",
            "bg-glass-bg/60 border-glass-border/60 shadow-[0_4px_16px_hsla(var(--glass-shadow),0.05)]": 
              variant === "subtle"
          },
          className
        )}
        {...props}
      />
    )
  }
)

GlassCard.displayName = "GlassCard"

export { GlassCard }