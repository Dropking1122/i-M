import React, { useState, useEffect } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export default function DecryptedText({ text, speed = 40, className = '', delay = 0 }: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;
    
    let currentIteration = 0;
    const totalIterations = text.length;
    
    const interval = setInterval(() => {
      setDisplayText(prev => {
        let newText = text.split("").map((char, index) => {
          if (index < currentIteration) {
            return text[index];
          }
          if (char === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("");
        
        return newText;
      });
      
      currentIteration += 1 / 3; // Reveal one real character every 3 ticks
      
      if (currentIteration >= totalIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed, isStarted]);

  return (
    <span className={className}>
      {isStarted ? displayText : ""}
    </span>
  );
}
