import { BackgroundRippleEffect } from "../ui/background-ripple-effect";

export default function HomeSecton() {
  return (
    <div className="relative min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* Navbar fixed at top */}

      {/* Background animation */}
      <BackgroundRippleEffect />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
          Soumalya Jana
        </h2>
        <p className="mt-4 text-neutral-800 dark:text-neutral-500">
          Full Stack and Machine Learning Engineer
        </p>
      </div>
    </div>
  );
}
