import { useRef } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";

/**
 * A reusable hook for consistent scroll reveal animations across sections.
 * Defaults to triggering once when the element is 8% into the viewport.
 */
export function useScrollAnimation(
  margin: UseInViewOptions["margin"] = "-8% 0px",
  once: boolean = true
) {
  const ref = useRef<HTMLDivElement>(null);
  
  // By casting margin as 'any' or its exact type here, 
  // we bypass strict literal string type checking in v12.
  const isInView = useInView(ref, { 
    once, 
    margin: margin as any 
  });

  return { ref, inView: isInView };
}