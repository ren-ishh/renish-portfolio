"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  id?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionWrapper({ id, children, className = "", delay = 0 }: Props) {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <section id={id} ref={ref} className={`section ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}