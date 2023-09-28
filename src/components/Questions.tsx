import { Card } from "antd";
import "../styles/questions.css";
import { AnyQuestion } from "./QuestionForm";
import QuestionDisplay from "./QuestionDisplay";
import { useState } from "react";

export interface QuestionsProps {
  onQuestionsDataChange: (questionsData: any) => void;
}

const Questions: React.FC<QuestionsProps> = ({ onQuestionsDataChange }) => {
  const initialQuestions: AnyQuestion[] = [
    {
      type: "Paragraph",
      questionText: "Please tell me about yourself in less than 500 words",
    },
    {
      type: "Yes/No question",
      questionText: "Have you ever been rejected by the UK embassy?",
    },
    {
      type: "Dropdown",
      questionText: "Please select the year of graduation from the list below",
    },
  ];

  const [questionsData, setQuestionsData] =
    useState<AnyQuestion[]>(initialQuestions);

  const handleQuestionsDataChange = (newData: AnyQuestion[]) => {
    setQuestionsData(newData);
    onQuestionsDataChange(newData);
  };

  return (
    <>
      <Card
        title="Additional questions"
        bordered={false}
        style={{ width: 500, fontSize: "14px" }}
      >
        <QuestionDisplay
          initialQuestions={questionsData}
          onSaveQuestion={(question) => {
            const updatedQuestions = [...questionsData, question];
            handleQuestionsDataChange(updatedQuestions);
          }}
        />
      </Card>
    </>
  );
};

export default Questions;
