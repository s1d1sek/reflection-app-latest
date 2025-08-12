// lib/mock.ts
import { QUESTIONS } from "../lib/questions";

export type MockAnswer = {
  id: string;
  content: string;
  created_at: string;
  author: string;
  tag: "anxiety" | "grief" | "work" | "family" | "self";
  question: string;
};

const names = ["Ava","Noah","Mia","Leo","Zoe","Liam","Aria","Kai","Nora","Eli"];
const feelings = [
  "I’m overwhelmed with work but pretending I’m fine.",
  "I feel lonely even around friends.",
  "I’m anxious about the future and avoiding thinking about it.",
  "I’m frustrated with a family member but don’t want conflict.",
  "I’m proud of a small win but afraid to share it.",
  "I’m grieving something I never allowed myself to name.",
  "I feel guilty taking breaks, like I don’t deserve rest.",
  "I’m scared to disappoint people who believe in me.",
  "I’m hopeful today, which feels unfamiliar but nice.",
  "I feel stuck and it scares me."
];
const tags: MockAnswer["tag"][] = ["anxiety","grief","work","family","self"];

export function generateMockAnswers(count = 12): MockAnswer[] {
  const now = Date.now();
  return Array.from({ length: count }).map((_, i) => ({
    id: Math.random().toString(36).slice(2),
    content: feelings[i % feelings.length],
    created_at: new Date(now - i * 36e5).toISOString(),
    author: names[i % names.length],
    tag: tags[i % tags.length],
    question: QUESTIONS[i % QUESTIONS.length],
  }));
}
