import React, { useState } from 'react';
import AnswersScreen from './screens/AnswersScreen';
import QuestionScreen from './screens/QuestionScreen';
import WelcomeScreen from './screens/WelcomeScreen';

type Screen = 'welcome' | 'question' | 'answers';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [answers, setAnswers] = useState<string[]>([]);
  const [question] = useState('What emotion are you avoiding today?');

  if (screen === 'welcome') {
    return <WelcomeScreen onStart={() => setScreen('question')} />;
  }

  if (screen === 'question') {
    return (
      <QuestionScreen
        question={question}
        onSubmit={(a) => {
          setAnswers((prev) => [a, ...prev]);
          setScreen('answers');
        }}
      />
    );
  }

  return <AnswersScreen answers={answers} onBack={() => setScreen('welcome')} />;
}
