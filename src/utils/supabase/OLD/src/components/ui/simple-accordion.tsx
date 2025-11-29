import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "./utils";

interface AccordionContextValue {
  value: string[];
  onValueChange: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

export function SimpleAccordion({
  type = "single",
  defaultValue,
  className,
  children,
}: {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
  children: React.ReactNode;
}) {
  const [value, setValue] = React.useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  );

  const onValueChange = (itemValue: string) => {
    if (type === "single") {
      setValue(value.includes(itemValue) ? [] : [itemValue]);
    } else {
      setValue((prev) =>
        prev.includes(itemValue)
          ? prev.filter((v) => v !== itemValue)
          : [...prev, itemValue]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ value, onValueChange, type }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function SimpleAccordionItem({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionItem must be used within Accordion");

  const isOpen = context.value.includes(value);

  return (
    <div className={cn("border border-gray-700 rounded-lg", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen,
            onToggle: () => context.onValueChange(value),
          });
        }
        return child;
      })}
    </div>
  );
}

export function SimpleAccordionTrigger({
  className,
  children,
  isOpen,
  onToggle,
}: {
  className?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex w-full items-center justify-between p-4 text-left transition-all hover:bg-gray-800/50",
        className
      )}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

export function SimpleAccordionContent({
  className,
  children,
  isOpen,
}: {
  className?: string;
  children: React.ReactNode;
  isOpen?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-200",
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className={cn("p-4 pt-0", className)}>{children}</div>
    </div>
  );
}
