import { Play, X } from "lucide-react";

type SwipeButtonsProps = {
  handleSwipeRight: () => void;
  handleSwipeLeft: () => void;
};

export default function SwipeButtons({
  handleSwipeRight,
  handleSwipeLeft,
}: SwipeButtonsProps) {
  return (
    <div className="swipe-buttons-container">
      <button
        onClick={handleSwipeLeft}
        title="Dont select"
        aria-label="Dont select media"
      >
        <X />
      </button>

      <button
        onClick={handleSwipeRight}
        title="Select media"
        aria-label="Select media"
      >
        <Play />
      </button>
    </div>
  );
}
