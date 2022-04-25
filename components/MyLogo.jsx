import Link from "next/link";

const MyLogo = () => {
  return (
    <Link href="https://leonro.de">
      <div className="ml-2 w-12 h-12 cursor-pointer">
        <svg
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
        >
          <defs>
            <linearGradient
              y2="-0.06144"
              x2="5.01609"
              y1="-0.06144"
              x1="-0.23877"
              id="gradient-fill"
            >
              <stop stopColor="#ff00cc" offset="0" />
              <stop stopColor="#e21ecb" offset="0.14286" />
              <stop stopColor="#c52ac7" offset="0.28571" />
              <stop stopColor="#a931c2" offset="0.42857" />
              <stop stopColor="#8c34ba" offset="0.57143" />
              <stop stopColor="#6f36b1" offset="0.71429" />
              <stop stopColor="#5235a6" offset="0.85714" />
              <stop stopColor="#333399" offset="1" />
            </linearGradient>
          </defs>
          <g>
            <title>Layer 1</title>
            <g id="svg_4">
              <path
                id="svg_1"
                d="m84.91499,318.27l0,-286.58l8.95,0l0,277.62l143.29,0l0,9l-152.24,-0.04z"
                fill="url(#gradient-fill)"
              />
              <path
                id="svg_2"
                d="m85.41499,318.27l0,-286.58l84,0q24.06,0 42.61,10.22a74.41,74.41 0 0 1 29.1,28.54q10.56,18.33 10.57,43q0,24.35 -10.57,42.61a74.06,74.06 0 0 1 -29.1,28.4q-18.55,10.16 -42.61,10.15l-79.52,0l0,-9l79.48,0q21.54,0 38.06,-8.95a65.34,65.34 0 0 0 25.89,-25.19q9.36,-16.23 9.37,-38.06t-9.37,-38.33a65.53,65.53 0 0 0 -25.89,-25.4q-16.51,-9 -38.06,-9l-75,0l0,277.59l-8.96,0zm109.15,-130.42l70.52,130.42l-10.07,0l-70.53,-130.42l10.08,0z"
                fill="url(#gradient-fill)"
              />
              <rect
                id="svg_3"
                height="9"
                width="20"
                y="309.25"
                x="236.56499"
                fill="url(#gradient-fill)"
              />
            </g>
          </g>
        </svg>
      </div>
    </Link>
  );
};

export default MyLogo;
