import { useRef, useState, type JSX } from "react";

type MediaCardProps = {
  name: string;
  posterPath: string;
  backdropPath: string;
  nextMediaImgPath: string;
  handleSwipeRight: () => void;
  handleSwipeLeft: () => void;
};

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w780";

export default function MediaCard({
  name,
  posterPath,
  backdropPath,
  nextMediaImgPath,
  handleSwipeLeft,
  handleSwipeRight,
}: MediaCardProps): JSX.Element {
  const [startPos, setStartPos] = useState<number | null>(null);
  const imgRef = useRef(null);
  const [translateX, setTranslateX] = useState<number>(0);

  function handleSwipeCompleted(e) {
    if (!startPos) return;

    const lastPos = e.clientX;
    const swipeLength = 140;

    if (lastPos - swipeLength > startPos) {
      //right swipe
      setStartPos(null);
      handleSwipeRight();
      setTranslateX(0);
    } else if (lastPos + swipeLength < startPos) {
      //left swipe
      setStartPos(null);
      handleSwipeLeft();
      setTranslateX(0);
    } else {
      setTranslateX(0);
    }
  }

  function handleAnimateSwipe(e) {
    if (!startPos) return;

    const currPos = e.clientX;

    setTranslateX(currPos - startPos);
  }

  const img = posterPath
    ? IMG_BASE_URL + posterPath
    : IMG_BASE_URL + backdropPath;

  const nextImg = IMG_BASE_URL + nextMediaImgPath;

  return (
    <article className="media-card">
      <div className="swipe-container">
        <img alt="" className="swipe-img backgroud-img" src={nextImg} />
        <img
          style={{
            transform: `translateX(${translateX}px)`,
            transition: "all 0.1s ease-in-out",
          }}
          ref={imgRef}
          onPointerDownCapture={e => setStartPos(e.clientX)}
          onPointerMoveCapture={handleAnimateSwipe}
          onPointerOut={handleSwipeCompleted}
          alt={`Poster of ${name}`}
          src={img}
          className="swipe-img current-img"
        />
      </div>
    </article>
  );
}
