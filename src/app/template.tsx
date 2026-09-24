import PageMotion from "@/components/motion/PageMotion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="curtain" aria-hidden>
        <span className="curtain-mark">spacedrift</span>
      </div>
      <PageMotion>{children}</PageMotion>
    </>
  );
}
