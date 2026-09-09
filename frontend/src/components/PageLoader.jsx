import { LoaderCircle } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-[2px]">
      <div className="pointer-events-auto rounded-full border border-white/10 bg-white/15 p-5 shadow-[0_0_60px_rgba(34,211,238,0.18)] backdrop-blur-md">
        <LoaderCircle className="h-12 w-12 animate-spin text-cyan-400" />
      </div>
    </div>
  );
};

export default PageLoader;
