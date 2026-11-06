import React, { createContext, useContext } from 'react';
import { useIntersectionObserver, getStaggerClass } from '../hooks/useIntersectionObserver';

interface StaggerContextValue {
  hasEntered: boolean;
}

const StaggerContext = createContext<StaggerContextValue>({ hasEntered: false });

export const useStaggerContext = () => useContext(StaggerContext);

export interface StaggerSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  threshold?: number;
  rootMargin?: string;
  id?: string;
}

/**
 * Section wrapper that observes viewport entry using IntersectionObserver
 * and provides animation state to child StaggerItem components.
 */
export const StaggerSection: React.FC<StaggerSectionProps> = ({
  children,
  className = '',
  as: Component = 'section',
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  id,
  ...rest
}) => {
  const { ref, hasEntered } = useIntersectionObserver<HTMLElement>({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  return (
    <StaggerContext.Provider value={{ hasEntered }}>
      <Component ref={ref} id={id} className={className} {...rest}>
        {children}
      </Component>
    </StaggerContext.Provider>
  );
};

export interface StaggerItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  step?: number;
  className?: string;
  as?: React.ElementType;
}

/**
 * Item that applies staggered Tailwind transition classes when its parent
 * StaggerSection enters the viewport via IntersectionObserver.
 */
export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  step = 0,
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  const { hasEntered } = useStaggerContext();
  const staggerClasses = getStaggerClass(hasEntered, step);

  return (
    <Component className={`${staggerClasses} ${className}`} {...rest}>
      {children}
    </Component>
  );
};
