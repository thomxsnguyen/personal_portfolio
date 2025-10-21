function SideMountains() {
  return (
    <>
      {/* Left side mountain with morning sky - FULL HEIGHT */}
      <div className="fixed left-0 top-0 h-screen pointer-events-none z-0 drop-shadow-lg">
        <svg
          width="350"
          height="100%"
          viewBox="0 0 350 1080"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Morning sky gradient */}
          <defs>
            <linearGradient
              id="skyGradientLeft"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#BFDBFE" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#DBEAFE" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F0F9FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Sky background */}
          <rect
            x="0"
            y="0"
            width="350"
            height="1080"
            fill="url(#skyGradientLeft)"
          />

          {/* Bottom mountains */}
          <path
            d="M0 1080 L70 930 L140 980 L210 900 L280 960 L350 860 L350 1080 Z"
            fill="#9CA3AF"
            opacity="0.5"
          />
          <path
            d="M0 1080 L50 1000 L100 1040 L150 970 L200 1030 L250 940 L300 1000 L350 1080 Z"
            fill="#6B7280"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Right side mountain with morning sky - FULL HEIGHT */}
      <div className="fixed right-0 top-0 h-screen pointer-events-none z-0 drop-shadow-lg">
        <svg
          width="350"
          height="100%"
          viewBox="0 0 350 1080"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Morning sky gradient */}
          <defs>
            <linearGradient
              id="skyGradientRight"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#BFDBFE" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#DBEAFE" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F0F9FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Sky background */}
          <rect
            x="0"
            y="0"
            width="350"
            height="1080"
            fill="url(#skyGradientRight)"
          />

          {/* Bottom mountains */}
          <path
            d="M0 860 L70 960 L140 900 L210 980 L280 930 L350 1080 L0 1080 Z"
            fill="#9CA3AF"
            opacity="0.5"
          />
          <path
            d="M0 1000 L35 940 L85 1030 L140 970 L195 1040 L245 1000 L295 940 L350 960 L350 1080 L0 1080 Z"
            fill="#6B7280"
            opacity="0.7"
          />
        </svg>
      </div>
    </>
  );
}

export default SideMountains;
