function AnimatedGradientBorder({ children, className = "" }) {
  return (
    <div
      className={`
        border border-transparent
        [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,theme(colors.indigo.500)_86%,theme(colors.indigo.300)_90%,theme(colors.indigo.500)_94%,theme(colors.slate.600/.48))_border-box]
        [animation:border-spin_4s_linear_infinite] ${className}
      `}
    >
      {children}
    </div>
  );
}

export default AnimatedGradientBorder;
