import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { useThrottle } from "../../components/hooks/useThrottle";

const ROW_HEIGHT = 40;
const TOTAL_COUNT = 10000;
const EXTRA = 10;
const DEFAULT_HEIGHT = 400;

const items = Array.from({ length: TOTAL_COUNT }, (_, i) => `Item ${i + 1}`);

function VirtualizedList() {
  const containerRef = useRef(null);
  const [rawScrollTop, setRawScrollTop] = useState(0);

  const scrollTop = useThrottle(rawScrollTop, 100);
  const totalHeight = TOTAL_COUNT * ROW_HEIGHT;

  const [containerHeight, setContainerHeight] = useState(DEFAULT_HEIGHT);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setRawScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  const { startIndex, endIndex, offsetY } = useMemo(() => {

    console.log('TEST');

    const height = containerRef.current?.clientHeight || containerHeight;

    const calculatedStartIndex = Math.max(
      Math.floor(scrollTop / ROW_HEIGHT) - EXTRA,
      0
    );

    const calculatedEndIndex = Math.min(
      Math.ceil((scrollTop + height) / ROW_HEIGHT) + EXTRA,
      TOTAL_COUNT
    );

    const calculatedOffsetY = calculatedStartIndex * ROW_HEIGHT;

    return {
      startIndex: calculatedStartIndex,
      endIndex: calculatedEndIndex,
      offsetY: calculatedOffsetY
    };
  }, [scrollTop, containerHeight]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, []);

  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: `${DEFAULT_HEIGHT}px`,
        overflowY: "auto",
        border: "1px solid #ccc",
      }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: "absolute",
            width: "100%",
            top: 0,
            left: 0,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{
                height: ROW_HEIGHT,
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
                borderBottom: "1px solid #eee",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function Custom() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Virtualized List Demo</h2>
      <VirtualizedList />
    </div>
  );
}
