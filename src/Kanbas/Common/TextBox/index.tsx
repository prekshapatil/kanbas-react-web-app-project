import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { FaBold } from "react-icons/fa6";
import { GoItalic } from "react-icons/go";
import { FiUnderline } from "react-icons/fi";
import { MdFormatColorText } from "react-icons/md";
import { BiHighlight, BiParagraph } from "react-icons/bi";
import { RiSuperscript2 } from "react-icons/ri";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { MdOutlineRotateRight } from "react-icons/md";
import { FaRegKeyboard } from "react-icons/fa";
import { HiMiniCodeBracket } from "react-icons/hi2";
import { PiArrowsOutSimple } from "react-icons/pi";
import { PiDotsSixVertical } from "react-icons/pi";
import { Link } from "react-router-dom";
import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "./reducer";
import { text } from "stream/consumers";

interface TextEditorProps {
  textData: string; // Define a prop for the API endpoint
}


const TextEditor: React.FC <TextEditorProps> = ({ textData }) => {
  const [fontSize, setFontSize] = useState("16px");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [highlightColor, setHighlightColor] = useState("#FFFF00");
  const highlightColorPickerRef = useRef<HTMLInputElement>(null);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  

  const dispatch = useDispatch();
const textBox = useSelector((state: KanbasState) => state.textBoxReducer.textBox);


  //const dispatch = useDispatch();
  const toggleBold = () => {
    setIsBold(!isBold);
  };
  const toggleItalics = () => {
    setIsItalic(!isItalic);
  };
  const toggleUnderline = () => {
    setIsUnderline(!isUnderline);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedFontSize = event.target.value;
    setFontSize(selectedFontSize);
    document.execCommand("fontSize", false, selectedFontSize);
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    document.execCommand("foreColor", false, color);
  };

  const handleHighlightColorChange = (color: string) => {
    document.execCommand("hiliteColor", false, color);
  };
  const handleHighlightButtonClick = () => {
    if (highlightColorPickerRef.current) {
      highlightColorPickerRef.current.click();
    }
  };

  const toggleSuperscript = () => {
    document.execCommand("superscript");
    setIsSuperscript(!isSuperscript);
  };

  const updateWordCount = (textArea: HTMLTextAreaElement) => {
    const words = textArea.value.trim().split(/\s+/);
    setWordCount(words.length);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            Edit
          </a>
        </span>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            View
          </a>
        </span>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            Insert
          </a>
        </span>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            Format
          </a>
        </span>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            Tools
          </a>
        </span>
        <span>
          <a href="#" style={{ textDecoration: "none", color: "black" }}>
            Table
          </a>
        </span>
        <span className="float-end">
          <MdOutlineRotateRight style={{ color: "green", fontSize: "30px" }} />{" "}
          100%
        </span>

        <div id="editor">
          <div id="formattingOptions">
            <select
              id="fontSizeSelect"
              onChange={handleFontSizeChange}
              value={fontSize}
            >
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
            </select>

            <select id="paraType" style={{ border: "none" }}>
              <option value="paragraph">Paragraph</option>
            </select>
            <div className="vertical-line"></div>
            <span>
              <FaBold onClick={toggleBold} className="icon" />
            </span>
            <span>
              <GoItalic onClick={toggleItalics} className="icon" />
            </span>
            <span>
              <FiUnderline onClick={toggleUnderline} className="icon" />
            </span>
            <span onClick={toggleColorPicker} className="colorPickerIcon">
              <MdFormatColorText />
            </span>
            {showColorPicker && (
              <input
                type="color"
                className="colorPicker"
                onChange={(e) => handleTextColorChange(e.target.value)}
                value={textColor}
              />
            )}

            <span onClick={toggleColorPicker} className="colorPickerIcon">
              <BiHighlight />
            </span>
            {showColorPicker && (
              <input
                type="color"
                className="colorPicker"
                onChange={(e) => handleHighlightColorChange(e.target.value)}
              />
            )}
            <span>
              <RiSuperscript2 onClick={toggleSuperscript} className="icon" />
            </span>
            <div className="vertical-line"></div>
            <span>
              <HiOutlineEllipsisVertical />
            </span>
          </div>
          <br />

          <textarea
            value={textBox.text}
            onChange={(e) => {
              dispatch(setText(e.target.value));
            }}
            id="textInput"
            placeholder="Enter your text here..."
            style={{
              color: textColor,
              fontSize,
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
              textDecoration: isUnderline ? "underline" : "none",
              verticalAlign: isSuperscript ? "super" : "baseline",
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginLeft: "auto", display: "flex" }}>
              <span>
                <FaRegKeyboard style={{ color: "red" }} />
              </span>
              <div className="vertical-line"></div>

              <span>
                <p style={{ color: "red", margin: 0 }}>0 words</p>
              </span>
              <div className="vertical-line"></div>
              <span>
                <HiMiniCodeBracket style={{ color: "red" }} />
              </span>
              <span>
                <PiArrowsOutSimple style={{ color: "red" }} />
              </span>

              <div
                style={{
                  border: "1px solid red",
                  padding: "0.5px",
                  borderRadius: "5px",
                  display: "inline-block",
                }}
              >
                <span>
                  <PiDotsSixVertical />
                </span>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
