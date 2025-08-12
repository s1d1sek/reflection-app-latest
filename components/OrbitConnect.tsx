// components/OrbitConnect.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type ArcDef = { startDeg: number; endDeg: number };

export default function OrbitConnect({
  size = 320,
  duration = 5000,           // total time for full circle
  stroke = 4,
}: {
  size?: number;
  duration?: number;
  stroke?: number;
}) {
  // single progress 0→1 drives all arcs and dots
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false, // animating SVG props
    }).start();
  }, [duration]);

  const half = size / 2;
  const r = size * 0.32;
  const cx = half;
  const cy = half;

  // We’ll draw 8 small arcs (45° each):
  // from each dot (0°, 90°, 180°, 270°) we expand CW and CCW by 45°
  const base = [0, 90, 180, 270]; // right, bottom, left, top (SVG uses +x to the right, +y down)
  const spread = 45;
  const arcs: ArcDef[] = useMemo(() => {
    const arr: ArcDef[] = [];
    for (const a of base) {
      arr.push({ startDeg: a, endDeg: a + spread }); // CW
      arr.push({ startDeg: a, endDeg: a - spread }); // CCW
    }
    return arr;
  }, []);

  // Each arc length = r * angle (in radians)
  const arcLen = useMemo(() => r * (spread * Math.PI / 180), [r]);
  const dashArray = `${arcLen} ${arcLen}`;

  // dots: radius grows & fades in
  const dotR = progress.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0, 12, 10],
  });
  const dotOpacity = progress.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, 1, 1],
  });

  // gentle breathing of whole motif
  const scale = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.96, 1.02, 1],
  });

  // arc utility
  const polarToCartesian = (cx: number, cy: number, r: number, deg: number) => {
    const rad = (deg - 90) * (Math.PI / 180); // rotate so 0° is at top visually
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const arcPath = (startDeg: number, endDeg: number) => {
    const start = polarToCartesian(cx, cy, r, startDeg);
    const end = polarToCartesian(cx, cy, r, endDeg);
    // small arc (<= 180°): largeArcFlag=0, sweep depends on direction
    const sweepFlag = (endDeg - startDeg) >= 0 ? 1 : 0; // CW if positive
    return `M ${start.x} ${start.y} A ${r} ${r} 0 0 ${sweepFlag} ${end.x} ${end.y}`;
  };

  // For a “growing from both sides” feel, we also stagger each arc slightly.
  // Each arc’s dashoffset goes from arcLen → 0.
  const dashOffsetForIndex = (i: number) =>
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [arcLen, 0],
    });

  return (
    <View style={[styles.box, { width: size, height: size }]}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Svg width={size} height={size}>
          {/* soft glow background ring */}
          <Circle
            cx={cx}
            cy={cy}
            r={r}
            stroke="white"
            strokeOpacity={0.12}
            strokeWidth={stroke + 4}
            fill="none"
          />

          {/* 8 growing arc segments */}
          {arcs.map((a, i) => (
            <AnimatedPath
              key={i}
              d={arcPath(a.startDeg, a.endDeg)}
              stroke="white"
              strokeWidth={stroke}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffsetForIndex(i) as any}
              // subtle delay per arc to enhance the “expanding from dots” feeling
              // (implemented by drawing order; the single progress drives all)
            />
          ))}

          {/* Four expanding dots at cardinal points */}
          {/* Top */}
          <AnimatedCircle cx={cx} cy={cy - r} r={dotR as any} fill="white" fillOpacity={dotOpacity as any} />
          {/* Right */}
          <AnimatedCircle cx={cx + r} cy={cy} r={dotR as any} fill="white" fillOpacity={dotOpacity as any} />
          {/* Bottom */}
          <AnimatedCircle cx={cx} cy={cy + r} r={dotR as any} fill="white" fillOpacity={dotOpacity as any} />
          {/* Left */}
          <AnimatedCircle cx={cx - r} cy={cy} r={dotR as any} fill="white" fillOpacity={dotOpacity as any} />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: "center", justifyContent: "center" },
});
