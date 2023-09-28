import { Card } from "antd";
import "../styles/questions.css";
import { AnyQuestion } from "./QuestionForm";
import QuestionDisplay from "./QuestionDisplay";

const Questions = () => {
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

  return (
    <>
      <Card
        title="Additional questions"
        bordered={false}
        style={{ width: 500, fontSize: "14px" }}
      >
        <QuestionDisplay
          initialQuestions={initialQuestions}
          onSaveQuestion={(question) => {
            // console.log(question);
          }}
        />
      </Card>
    </>
  );
};

export default Questions;
