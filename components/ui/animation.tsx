// components/AnimatedCollapse.tsx
import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

interface AnimatedCollapseProps {
  toggle: boolean;
  children: React.ReactNode; // Define children as React.ReactNode
}

const AnimatedCollapse: React.FC<AnimatedCollapseProps> = ({
  children,
  toggle,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, animate] = useSpring(() => ({ height: "0px" }), []);

  useEffect(() => {
    if (ref.current) {
      animate({
        height: (toggle ? ref.current.offsetHeight : 0) + "px",
      });
    }
  }, [animate, ref, toggle]);

  return (
    <animated.div
      style={{
        overflow: "hidden",
        width: "100%",
        ...style,
      }}
    >
      <div ref={ref}>{children}</div>
    </animated.div>
  );
};

export default AnimatedCollapse;
