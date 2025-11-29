import * as React from "react";

interface DropdownProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  align?: "start" | "end";
}

export const SimpleDropdown: React.FC<DropdownProps> = ({ children, trigger, align }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  let positionClass = "left-0";
  if (align === "end") {
    positionClass = "right-0";
  }

  const dropdownClasses = "absolute mt-2 z-50 min-w-[200px] rounded-md border border-gray-700 bg-gray-900 p-1 shadow-lg animate-in fade-in-0 zoom-in-95 " + positionClass;

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className={dropdownClasses}>
          {children}
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const SimpleDropdownItem: React.FC<DropdownItemProps> = ({ children, onClick, className }) => {
  let finalClassName = "w-full flex items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-800";
  if (className) {
    finalClassName = finalClassName + " " + className;
  }

  return (
    <button onClick={onClick} className={finalClassName}>
      {children}
    </button>
  );
};

interface DropdownLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SimpleDropdownLabel: React.FC<DropdownLabelProps> = ({ children, className }) => {
  let finalClassName = "px-2 py-1.5 text-sm";
  if (className) {
    finalClassName = finalClassName + " " + className;
  }

  return <div className={finalClassName}>{children}</div>;
};

interface DropdownSeparatorProps {
  className?: string;
}

export const SimpleDropdownSeparator: React.FC<DropdownSeparatorProps> = ({ className }) => {
  let finalClassName = "-mx-1 my-1 h-px";
  if (className) {
    finalClassName = finalClassName + " " + className;
  }

  return <div className={finalClassName} />;
};
