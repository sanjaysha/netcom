const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#070B2A]">
      {/* Main gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(236,72,153,0.35),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(6,182,212,0.3),transparent_30%),radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.25),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(139,92,246,0.35),transparent_35%)]" />

      {/* Top-left vibrant blob */}
      <div
        className="
          absolute -left-32 -top-32
          h-[450px] w-[450px]
          rounded-full
          bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400
          opacity-70
          blur-[2px]
        "
      />

      {/* Top-right blue blob */}
      <div
        className="
          absolute -right-40 -top-40
          h-[500px] w-[500px]
          rounded-full
          bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600
          opacity-60
          blur-[3px]
        "
      />

      {/* Bottom-right purple/cyan shape */}
      <div
        className="
          absolute -bottom-52 -right-32
          h-[550px] w-[650px]
          rounded-[45%]
          rotate-[-15deg]
          bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
          opacity-60
          blur-[2px]
        "
      />

      {/* Bottom-left pink blob */}
      <div
        className="
          absolute -bottom-48 -left-48
          h-[500px] w-[500px]
          rounded-full
          bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-600
          opacity-60
        "
      />

      {/* Floating glowing circles */}
      <div
        className="
          absolute left-[10%] top-[60%]
          h-20 w-20
          rounded-full
          bg-gradient-to-br from-pink-400 to-purple-600
          opacity-70
          shadow-[0_0_60px_rgba(236,72,153,0.5)]
        "
      />

      <div
        className="
          absolute right-[12%] top-[18%]
          h-16 w-16
          rounded-full
          bg-gradient-to-br from-purple-400 to-blue-500
          opacity-80
          shadow-[0_0_50px_rgba(99,102,241,0.6)]
        "
      />

      {/* Decorative grid dots */}
      <div
        className="
          absolute left-[12%] top-[8%]
          h-28 w-28
          opacity-40
          [background-image:radial-gradient(circle,white_1.5px,transparent_1.5px)]
          [background-size:24px_24px]
        "
      />

      <div
        className="
          absolute right-[10%] top-[55%]
          h-32 w-32
          opacity-30
          [background-image:radial-gradient(circle,white_1.5px,transparent_1.5px)]
          [background-size:24px_24px]
        "
      />

      {/* Large decorative rings */}
      <div
        className="
          absolute -left-32 top-[35%]
          h-[450px] w-[450px]
          rounded-full
          border border-white/10
        "
      />

      <div
        className="
          absolute -left-20 top-[40%]
          h-[350px] w-[350px]
          rounded-full
          border border-purple-300/10
        "
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-[#070B2A]/20 backdrop-blur-[1px]" />
    </div>
  );
};

export default Background;
