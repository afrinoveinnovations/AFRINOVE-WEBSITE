import React, { useState, useEffect, useRef } from 'react';

export const Counter = ({ target, suffix = '', duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now();
        const easeOut = t => 1 - Math.pow(1 - t, 3);
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(easeOut(progress) * target));
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(tick);
          } else {
            setCount(target);
            setIsFinished(true);
          }
        };
        requestAnimationFrame(tick);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.2 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  return <span ref={elementRef}>{count}{isFinished ? suffix : ''}</span>;
};

export const Reveal = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={elementRef} className={`${className} reveal ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};
