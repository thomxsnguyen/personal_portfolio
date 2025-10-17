function SideMountains() {
  return (
    <>
      {/* Left side mountain */}
      <div className="fixed left-0 bottom-0 pointer-events-none z-10">
        <svg
          width="350"
          height="500"
          viewBox="0 0 350 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400"
        >
          {/* Far mountain */}
          <path
            d="M0 500 L70 350 L140 400 L210 320 L280 380 L350 280 L350 500 Z"
            fill="currentColor"
            opacity="0.4"
          />
          {/* Near mountain */}
          <path
            d="M0 500 L50 420 L100 460 L150 390 L200 450 L250 360 L300 420 L350 500 Z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Right side mountain */}
      <div className="fixed right-0 bottom-0 pointer-events-none z-10">
        <svg
          width="350"
          height="500"
          viewBox="0 0 350 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400"
        >
          {/* Far mountain */}
          <path
            d="M0 280 L70 380 L140 320 L210 400 L280 350 L350 500 L0 500 Z"
            fill="currentColor"
            opacity="0.4"
          />
          {/* Near mountain */}
          <path
            d="M0 420 L35 360 L85 450 L140 390 L195 460 L245 420 L295 360 L350 380 L350 500 L0 500 Z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
      </div>
    </>
  );
}

export default SideMountains;
