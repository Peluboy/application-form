import React, { useState } from "react";
import { Button, Divider } from "antd";
import { CiEdit } from "react-icons/ci";
import { RiAddFill, RiDeleteBin6Line } from "react-icons/ri";
import QuestionForm, { AnyQuestion } from "./QuestionForm";

interface QuestionDisplayProps {
  onSaveQuestion: (question: AnyQuestion) => void;
  initialQuestions?: AnyQuestion[];
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  onSaveQuestion,
  initialQuestions = [],
}) => {
  const [isQuestionFormVisible, setIsQuestionFormVisible] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions);
  const [editedQuestion, setEditedQuestion] = useState<AnyQuestion | null>(
    null
  );

  const handleAddQuestionClick = () => {
    setIsQuestionFormVisible(true);
    setEditedQuestion(null);
  };

  const handleSaveQuestion = (question: AnyQuestion) => {
    if (editedQuestion) {
      const updatedQuestions = questions.map((q) =>
        q === editedQuestion ? question : q
      );
      setQuestions(updatedQuestions);
      setEditedQuestion(null);
    } else {
      setQuestions([...questions, question]);
    }
    setIsQuestionFormVisible(false);
    onSaveQuestion(question);
  };

  const handleEditQuestion = (question: AnyQuestion) => {
    setIsQuestionFormVisible(true);
    setEditedQuestion(question);
  };

  const handleDeleteQuestion = (question: AnyQuestion) => {
    const updatedQuestions = questions.filter((q) => q !== question);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="all-questions-container">
      {questions.map((question, index) => (
        <div key={index} className="each-question">
          <h5>{question.type}</h5>
          <div className="question-edit">
            <p className="questions-paragraph-style">{question.questionText}</p>
            <div
              className="questions icons"
              style={{ display: "flex", gap: "1rem", alignItems: "center" }}
            >
              <CiEdit
                size="20px"
                onClick={() => handleEditQuestion(question)}
                style={{ cursor: "pointer" }}
              />
              <RiDeleteBin6Line
                size="18px"
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteQuestion(question)}
              />
            </div>
          </div>
          {index < questions.length - 1 && <Divider />}
        </div>
      ))}
      {isQuestionFormVisible && (
        <div className="question-form-pt">
          <QuestionForm
            onSaveQuestion={handleSaveQuestion}
            editedQuestion={editedQuestion}
          />
        </div>
      )}
      <div>
        <Button className="add-questions" onClick={handleAddQuestionClick}>
          <RiAddFill size="20px" />
          <span>Add a question</span>
        </Button>
      </div>
    </div>
  );
};

export default QuestionDisplay;
