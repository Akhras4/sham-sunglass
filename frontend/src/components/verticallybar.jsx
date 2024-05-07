import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";
import { wrap } from "@motionone/utils";

export default function Vertically({ children, baseVelocity }) {
  const baseY = useMotionValue(0); 
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });
  const y = useTransform(baseY, (v) => `${wrap(-10, -45, v)}%`); 
  const directionFactor = useRef(1);
  
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1200);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseY.set(baseY.get() + moveBy);
  });

  return (
    <div className="parallaxV">
      <motion.div className="scroller" style={{ y }}>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
}