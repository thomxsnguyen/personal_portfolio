interface MoreProjectsButtonProps {
  href?: string;
  className?: string;
}

function MoreProjectsButton({
  href = "#",
  className = "",
}: MoreProjectsButtonProps) {
  return (
    <div className={`flex justify-start mt-12 ${className}`}>
      <a
        href={href}
        className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:scale-110 transition-transform duration-300 font-medium shadow-md"
      >
        More projects
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </div>
  );
}

export default MoreProjectsButton;
