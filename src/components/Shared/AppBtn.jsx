import { Button, Spinner } from "flowbite-react";

export default function AppBtn({ children, isLoading, className, ...props }) {
  return (
    <>
      <Button
        {...props}
        disabled={isLoading}
        className={`bg-[#283546] hover:bg-[#1F2937] dark:bg-cyan-500 dark:hover:bg-cyan-600 transition flex flex-row justify-center items-center cursor-pointer focus:ring-0 ${className}`}
      >
        {isLoading && (
          <Spinner
            aria-label="Spinner button example"
            size="sm"
            light
            className="me-1 mb-0.5"
          />
        )}
        {children}
      </Button>
    </>
  );
}
