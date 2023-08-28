import HeaderSection from "./(landing)/components/(sections)/HeaderSection";
import TopMask from "./(landing)/components/TopMask";
import BottomMask from "./(landing)/components/BottomMask";
import BodySection from "./(landing)/components/(sections)/BodySection";

export default function Home() {
  return (
    <div className="relative min-h-screen h-fit min-w-screen flex flex-col items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
      <HeaderSection />

      <div className="bg-neutral-100 dark:bg-neutral-800 backdrop-blur-lg">
        <TopMask />
        <BodySection />
        <BottomMask />
      </div>
    </div>
  );
}
