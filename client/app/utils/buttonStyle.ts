import type { Size, Variant } from "~/types";

export const variantClassByVariant: Record<Variant, string> = {
	primary: "bg-gradient-to-br from-primary to-primary-hover border-primary max-lg:text-white",
	secondary: "bg-primary/10",
	ghost: "text-primary",
	outline: "border border-primary",
};

export const textSizeClassBySize: Record<Size, string> = {
	xs: "text-sm",
	sm: "text-md",
	md: "text-lg",
	lg: "text-xl",
	xl: "text-2xl",
};
