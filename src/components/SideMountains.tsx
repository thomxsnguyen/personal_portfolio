function SideMountains() {
  return (
    <>
      {/* Left side mountain - FULL HEIGHT - Hidden on mobile */}
      <div className="hidden md:block fixed left-0 top-0 h-screen pointer-events-none z-[-1] w-[280px] lg:w-[320px] xl:w-[350px]">
        {/* Mountains layer */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 350 1080"
          preserveAspectRatio="xMinYMax slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0"
        >
          {/* Bottom mountains */}
          <path
            d="M0 1080 L70 930 L140 980 L210 900 L280 960 L350 860 L350 1080 Z"
            fill="#1a1a1a"
            opacity="0.8"
          />
          <path
            d="M0 1080 L50 1000 L100 1040 L150 970 L200 1030 L250 940 L300 1000 L350 1080 Z"
            fill="#0f0f0f"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Right side mountain - FULL HEIGHT - Hidden on mobile */}
      <div className="hidden md:block fixed right-0 top-0 h-screen pointer-events-none z-[-1] w-[280px] lg:w-[320px] xl:w-[350px]">
        {/* Mountains layer */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 350 1080"
          preserveAspectRatio="xMaxYMax slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0"
        >
          {/* Bottom mountains */}
          <path
            d="M0 860 L70 960 L140 900 L210 980 L280 930 L350 1080 L0 1080 Z"
            fill="#1a1a1a"
            opacity="0.8"
          />
          <path
            d="M0 1000 L35 940 L85 1030 L140 970 L195 1040 L245 1000 L295 940 L350 960 L350 1080 L0 1080 Z"
            fill="#0f0f0f"
            opacity="0.9"
          />
        </svg>
      </div>
    </>
  );
}

export default SideMountains;
