interface MoreProjectsButtonProps {
  href?: string;
  className?: string;
}

function MoreProjectsButton({
  href = "#",
  className = "",
}: MoreProjectsButtonProps) {
  return (
    <div className={`flex justify-center mt-12 ${className}`}>
      <a
        href={href}
        className="inline-flex items-center px-6 py-3 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700 hover:text-white transition-all duration-300 font-medium border border-neutral-700"
      >
        more projects
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
