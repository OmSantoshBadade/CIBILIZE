"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { memo } from "react";

interface ScoreGaugeProps {
  score: number | string;
  category: string;
  date: string;
}

const ScoreGauge = memo(({ score: scoreValue, category, date }: ScoreGaugeProps) => {
  const score = typeof scoreValue === "string" ? Number.parseInt(scoreValue) : scoreValue;

  // Calculate percentage for arc animation (0-1 range for 300-900)
  const normalizedScore = Math.max(300, Math.min(900, score));
  const percentage = (normalizedScore - 300) / (900 - 300);

  // Determine color based on score
  const getColor = (score: number) => {
    if (score >= 750) return "#22c55e"; // green
    if (score >= 650) return "#84cc16"; // lime
    if (score >= 550) return "#eab308"; // yellow
    if (score >= 450) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  const color = getColor(score);

  // Map score to Badge variant colors
  const getBadgeVariant = (value: number) => {
    if (value >= 750) return "green";
    if (value >= 650) return "lime";
    if (value >= 550) return "yellow";
    if (value >= 450) return "orange";
    return "red";
  };
  const badgeVariant = getBadgeVariant(score);

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-12">
      {/* Date */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-muted-foreground mb-8 text-sm"
      >
        {date}
      </motion.p>

      {/* Gauge SVG */}
      <div className="relative flex aspect-video w-full max-w-xs items-center justify-center">
        <svg viewBox="0 0 280 160" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
          {/* Background arc */}
          <path
            d="M 20 140 A 120 120 0 0 1 260 140"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="33%" stopColor="#f97316" />
              <stop offset="66%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          <motion.path
            d="M 20 140 A 120 120 0 0 1 260 140"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: percentage }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ pathLength: percentage }}
          />

          {/* Left label */}
          <text
            x="8"
            y="158"
            fontSize="13"
            fontWeight="500"
            fill="#6b7280"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            300
          </text>

          {/* Right label */}
          <text
            x="272"
            y="158"
            fontSize="13"
            fontWeight="500"
            fill="#6b7280"
            textAnchor="end"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            900
          </text>

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <circle
              cx={20 + 240 * percentage}
              cy={140 - Math.sqrt(Math.max(0, 14400 - Math.pow(240 * percentage - 120, 2)))}
              r="7"
              fill="white"
              stroke={color}
              strokeWidth="3"
            />
          </motion.g>
        </svg>
      </div>

      {/* Score and Category */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-6 flex flex-col items-center gap-3"
      >
        <p className="text-5xl font-bold tracking-tight">{score}</p>
        <Badge variant={badgeVariant} className="rounded-full">
          <span>{category}</span>

          {badgeVariant === "green" && "🎉"}
          {badgeVariant === "lime" && "🌿"}
          {badgeVariant === "yellow" && "🌟"}
          {badgeVariant === "orange" && "🔥"}
          {badgeVariant === "red" && "💥"}
        </Badge>
      </motion.div>
    </div>
  );
});

ScoreGauge.displayName = "ScoreGauge";

export default ScoreGauge;
