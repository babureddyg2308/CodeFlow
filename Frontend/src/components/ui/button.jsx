// import React from "react";
// import { cva } from "class-variance-authority";

// const cn = (...classes) => classes.filter(Boolean).join(' ');

// export const buttonVariants = cva(
//   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex gap-1 justify-center items-center",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
//         destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
//         outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
//         secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//         success: "bg-green-500 hover:bg-green-600 text-primary",
//         blue: "text-primary bg-blue-500 hover:bg-blue-600",
//       },
//       size: {
//         default: "h-9 px-4 py-2",
//         sm: "h-8 rounded-md px-3 text-xs",
//         lg: "h-10 rounded-md px-8",
//         icon: "h-9 w-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// );

// export const Button = React.forwardRef(function Button(
//   { className, loading, children, variant, size, asChild = false, ...props },
//   ref
// ) {
//   const Comp = asChild ? "span" : "button"; // Use "span" as a fallback for Slot
//   return (
//     <Comp
//       disabled={loading}
//       className={cn(buttonVariants({ variant, size }), className)}
//       ref={ref}
//       {...props}
//     >
//       {loading && <span className="animate-spin">Loading...</span>}
//       {children}
//     </Comp>
//   );
// });
// Button.displayName = "Button";

// // export default { Button, buttonVariants }; // Export Button and buttonVariants

import React from "react";
import { cva } from "class-variance-authority";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex gap-1 justify-center items-center",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-500 hover:bg-green-600 text-primary",
        blue: "text-primary bg-blue-500 hover:bg-blue-600",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Button = React.forwardRef(function Button(
  { className, loading, children, variant, size, asChild = false, ...props },
  ref
) {
  const Comp = asChild ? "span" : "button"; // Use "span" as a fallback for Slot
  return (
    <Comp
      disabled={loading}
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    >
      {loading && <span className="animate-spin">Loading...</span>}
      {children}
    </Comp>
  );
});

Button.displayName = "Button";

