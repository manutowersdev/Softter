import React from "react";
import styles from "styles/Back.module.css";
import { useRouter } from "next/router";

export default function Back(props) {
  const router = useRouter();

  return (
    <svg
      className={styles.backIcon}
      onClick={router.back}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      strokeWidth={3}
      fill="none"
      {...props}
    >
      <path
        d="m15 6-6 6 6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
