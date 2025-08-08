import { Stack } from 'expo-router';
import React, { createContext, useContext, useState } from 'react';

type AppCtx = {
  answers: string[];
  addAnswer: (a: string) => void;
};
const Ctx = createContext<AppCtx | null>(null);
export const useApp = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be inside provider');
  return v;
};

export default function RootLayout() {
  const [answers, setAnswers] = useState<string[]>([]);
  const addAnswer = (a: string) => setAnswers((prev) => [a, ...prev]);

  return (
    <Ctx.Provider value={{ answers, addAnswer }}>
      <Stack />
    </Ctx.Provider>
  );
}
