import React, { useState } from "react";
import { Button, Checkbox } from "antd";
import "../styles/questions.css";
import CustomDropdown from "./CustomDropdown";
import { RiListUnordered, RiDeleteBin6Line } from "react-icons/ri";
import { RxPlus } from "react-icons/rx";
import { RiCloseLine } from "react-icons/ri";

interface QuestionOption {
  id: string;
  text: string;
}

export interface VideoQuestion {
  type: string;
  questionText: string;
  options: QuestionOption[];
  questionInput: string;
  textArea: string;
  maxDuration: number;
}

export interface ParagraphQuestion {
  type: string;
  questionText: string;
}

export interface YesNoQuestion {
  type: string;
  questionText: string;
}

export interface DropdownQuestion {
  type: string;
  questionText: string;
}

export type AnyQuestion = ParagraphQuestion | YesNoQuestion | DropdownQuestion;

interface QuestionFormProps {
  onSaveQuestion: (question: VideoQuestion) => void;
  editedQuestion?: VideoQuestion | AnyQuestion | null;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSaveQuestion }) => {
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>("");
  const [questionText, setQuestionText] = useState<string>("");
  const [options, setOptions] = useState<QuestionOption[]>([]);

  const [textArea, setTextArea] = useState<string>("");
  const [maxDuration, setMaxDuration] = useState<number | undefined>();
  const [selectedTimeType, setSelectedTimeType] = useState<string>("");

  const handleQuestionTypeChange = (value: string) => {
    setSelectedQuestionType(value);
    if (value === "Multiple choice") {
      setOptions([{ id: "0", text: "" }]);
    } else {
      setOptions([]);
    }
  };

  const handleQuestionTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    let calculatedMaxDuration = 0;

    if (selectedTimeType === "in Minutes") {
      calculatedMaxDuration = (maxDuration || 0) * 60;
    } else {
      calculatedMaxDuration = maxDuration || 0;
    }

    const videoQuestion: VideoQuestion = {
      type: selectedQuestionType,
      questionText,
      options,
      questionInput: "",
      textArea,
      maxDuration: calculatedMaxDuration,
    };

    onSaveQuestion(videoQuestion);

    setSelectedQuestionType("");
    setQuestionText("");
    setOptions([]);
    setTextArea("");
    setMaxDuration(undefined);
    setSelectedTimeType("in Seconds");
  };

  const handleDeleteOption = (id: string) => {
    if (id !== "0") {
      const updatedOptions = options.filter((option) => option.id !== id);
      setOptions(updatedOptions);
    }
  };

  const handleDeleteQuestion = () => {
    setSelectedQuestionType("");
    setQuestionText("");
    setOptions([]);

    onSaveQuestion({
      type: "",
      questionText: "",
      options: [],
      questionInput: "",
      textArea: "",
      maxDuration: 0,
    });
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

  const timeTypes = ["in Seconds", "in Minutes"];

  const handleAddOption = () => {
    setOptions([...options, { id: `${options.length}`, text: "" }]);
  };

  const renderVideoQuestionFields = () => {
    if (selectedQuestionType === "Video question") {
      return (
        <div className="video-question-container">
          <div className="input-field-container">
            <label className="question-label">Questions</label>
            <input
              type="text"
              placeholder="Enter question"
              value={questionText}
              onChange={handleQuestionTextChange}
            />
          </div>
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
              <CustomDropdown
                options={timeTypes}
                onSelect={(selectedOption: string) =>
                  setSelectedTimeType(selectedOption)
                }
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const MultipleChoiceQuestion: React.FC<{
    options: QuestionOption[];
    onAddOption: () => void;
    onDeleteOption: (id: string) => void;
    onOptionChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => void;
  }> = ({ options, onAddOption, onDeleteOption, onOptionChange }) => {
    return (
      <div className="multiple-choice-container">
        <div className="input-field-container">
          <label className="question-label">Questions</label>
          <input
            type="text"
            placeholder="Enter question"
            value={questionText}
            onChange={handleQuestionTextChange}
          />
        </div>
        <div className="choice-label-input input-field-container">
          <label className="choice-label">Choice</label>
          {options.map((option, index) => (
            <div key={option.id}>
              <div className="input-field">
                <div className="multiple-choice-input-fields">
                  <RiListUnordered />
                  <div className="input-field-container">
                    <input
                      type="text"
                      name="answers"
                      placeholder="Type here"
                      value={option.text}
                      onChange={(e) => onOptionChange(e, index)}
                    />
                  </div>
                  <div onClick={onAddOption}>
                    <RxPlus />
                  </div>
                  <div onClick={() => onDeleteOption(option.id)}>
                    <RiDeleteBin6Line />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="checkbox-max-answers input-field-container">
            <Checkbox>Enable 'Other' options</Checkbox>
            <div className="max-choice-allowed">
              <label className="question-label">Max Choice allowed</label>
              <input type="number" placeholder="0" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderQuestionInput = () => {
    switch (selectedQuestionType) {
      case "Paragraph":
        return (
          <div className="input-field-container">
            <label className="question-label">Questions</label>
            <input
              type="text"
              placeholder="Enter question"
              value={questionText}
              onChange={handleQuestionTextChange}
            />
          </div>
        );
      case "Short answer":
        return (
          <div className="input-field-container">
            <label className="question-label">Questions</label>
            <input
              type="text"
              placeholder="Enter question"
              value={questionText}
              onChange={handleQuestionTextChange}
            />
          </div>
        );
      case "Dropdown":
        return (
          <div className="input-field-container">
            <label className="question-label">Questions</label>
            <input
              type="text"
              placeholder="Enter question"
              value={questionText}
              onChange={handleQuestionTextChange}
            />
          </div>
        );
      case "Yes/No":
        return (
          <div className="input-field-container">
            <label className="question-label">Questions</label>
            <input
              type="text"
              placeholder="Enter question"
              value={questionText}
              onChange={handleQuestionTextChange}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <CustomDropdown
        options={questionTypes}
        onSelect={handleQuestionTypeChange}
      />

      <div className="input-field-container">{renderQuestionInput()}</div>
      {renderVideoQuestionFields()}
      {selectedQuestionType === "Multiple choice" && (
        <MultipleChoiceQuestion
          options={options}
          onAddOption={handleAddOption}
          onDeleteOption={handleDeleteOption}
          onOptionChange={handleOptionChange}
        />
      )}
      <div className="button-container">
        <div className="delete-reupload" onClick={handleDeleteQuestion}>
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
