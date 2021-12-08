import * as React from "react";

export default function Home(props) {
  return (
    <svg height={21} width={21} viewBox="0 0 21 21" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m1.5 10.5 9-9 9 9M3.5 11.5v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
      </g>
    </svg>
  );
}
