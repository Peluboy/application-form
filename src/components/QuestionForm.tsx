import React, { useState } from "react";
import { Button } from "antd";
import "../styles/questions.css";
import CustomDropdown from "./CustomDropdown";
import { RiListUnordered, RiDeleteBin6Line } from "react-icons/ri";
import { RxPlus } from "react-icons/rx";
import { RiCloseLine } from "react-icons/ri";

interface QuestionOption {
  id: string;
  text: string;
}

interface VideoQuestion {
  type: string;
  questionText: string;
  options: QuestionOption[];
  questionInput: string;
  textArea: string;
  timeDuration: string;
  maxDuration: number;
}

interface QuestionFormProps {
  onSaveQuestion: (question: VideoQuestion) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSaveQuestion }) => {
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>("");
  const [questionText, setQuestionText] = useState<string>("");
  const [options, setOptions] = useState<QuestionOption[]>([]);

  // Additional state variables for video question
  const [questionInput, setQuestionInput] = useState<string>("");
  const [textArea, setTextArea] = useState<string>("");
  const [timeDuration, setTimeDuration] = useState<string>("");
  const [maxDuration, setMaxDuration] = useState<number | undefined>();

  const handleQuestionTypeChange = (value: string) => {
    setSelectedQuestionType(value);
    if (value === "Multiple choice") {
      setOptions([{ id: "0", text: "" }]);
    } else {
      setOptions([]);
    }
  };

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionText(e.target.value);
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedOptions = [...options];
    updatedOptions[index] = { id: `${index}`, text: e.target.value };
    setOptions(updatedOptions);
  };

  const handleSaveQuestion = () => {
    const videoQuestion: VideoQuestion = {
      type: selectedQuestionType,
      questionText,
      options,
      questionInput: "", // Initialize with appropriate values
      textArea: "", // Initialize with appropriate values
      timeDuration: "", // Initialize with appropriate values
      maxDuration: 0, // Initialize with appropriate values
    };

    onSaveQuestion(videoQuestion);

    // Clear input fields
    setSelectedQuestionType("");
    setQuestionText("");
    setOptions([]);
  };

  const handleDeleteOption = (id: string) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
  };

  const questionTypes = [
    "Paragraph",
    "Short answer",
    "Yes/No",
    "Multiple choice",
    "Date",
    "Number",
    "File upload",
    "Video question",
  ];

  const handleAddOption = () => {
    setOptions([...options, { id: `${options.length}`, text: "" }]);
  };

  const renderVideoQuestionFields = () => {
    if (selectedQuestionType === "Video question") {
      return (
        <div className="video-question-container">
          <div className="input-field-container">
            <textarea
              placeholder="Please talk about your achievements, goals and what you worked on as the latest project"
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
            />
          </div>
          <div className="time-durations">
            <div className="input-field-container">
              <input
                type="number"
                placeholder="Max duration of video"
                value={maxDuration || ""}
                onChange={(e) => setMaxDuration(parseInt(e.target.value))}
              />
            </div>
            <div className="input-field-container">
              <input
                type="text"
                placeholder="Enter time duration"
                value={timeDuration}
                onChange={(e) => setTimeDuration(e.target.value)}
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="form-container">
      <CustomDropdown
        options={questionTypes}
        onSelect={handleQuestionTypeChange}
      />

      <div className="input-field-container">
        <label htmlFor="">Questions</label>
        <input
          type="text"
          placeholder="Enter question"
          value={questionText}
          onChange={handleQuestionTextChange}
        />
      </div>
      {renderVideoQuestionFields()}
      {selectedQuestionType === "Dropdown" ||
      selectedQuestionType === "Multiple choice" ? (
        <div>
          {options.map((option, index) => (
            <div key={option.id}>
              <div className="input-field">
                <RiListUnordered />
                <div className="input-field-container">
                  <label htmlFor="">Choice</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={option.text}
                    onChange={(e) => handleOptionChange(e, index)}
                  />
                </div>
                <div onClick={handleAddOption}>
                  <RxPlus />
                </div>
                <div onClick={() => handleDeleteOption(option.id)}>
                  <RiDeleteBin6Line />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="button-container">
        <div
          className="delete-reupload"
          //   onClick={() =>
          //     onSaveQuestion({ type: "", questionText: "", options: [] })
          //   }
        >
          <RiCloseLine size="20px" />
          <span>Delete question</span>
        </div>
        <Button onClick={handleSaveQuestion} color="primary">
          Save
        </Button>
      </div>
    </div>
  );
};

export default QuestionForm;
