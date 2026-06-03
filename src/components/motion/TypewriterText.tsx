"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  cursorColor?: string;
}

export function TypewriterText({
  text,
  speed = 55,
  startDelay = 0,
  className,
  style,
  cursorColor = "#8b5cf6",
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return (
    <>
      {/* Text with optional gradient style */}
      <span className={className} style={style}>{displayed}</span>
      {/* Cursor rendered outside gradient span so it stays visible */}
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: "3px",
          height: "0.78em",
          marginLeft: "4px",
          verticalAlign: "middle",
          background: cursorColor,
          borderRadius: "1px",
          animation: done ? "blink 1.1s step-end infinite" : "none",
        }}
      />
    </>
  );
}
