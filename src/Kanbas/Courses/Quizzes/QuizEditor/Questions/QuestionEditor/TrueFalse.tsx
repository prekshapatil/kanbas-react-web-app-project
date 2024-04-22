import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import { addOption, setQuestion, updateOption } from "../reducer";
import { useEffect, useState } from "react";
function TrueFalse() {
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );

  const dispatch = useDispatch();

  const [trueFalse, setTrueFalse] = useState(true);

  useEffect(() => {
    console.log("True False Question", question);
    if (question.options.length > 0) {
      console.log("Ans ", question.options[0].option === "True");
      setTrueFalse(question.options[0].option === "True");
      console.log("True False", trueFalse);
    } else {
      console.log("Adding True False", question.options);
      //dispatch(addOption("True"));
      dispatch(setQuestion({...question, options: [{option: "True"}]}))
      setTrueFalse(true);
    }
  }, []);

  const handleRadioChange = (value: boolean) => {
    setTrueFalse(value);
    dispatch(updateOption({...question.options[0],option: value ? "True" : "False"}));
  };

  return (
    <div>
      <div>
        <input checked={trueFalse} type="radio" name="trueFalse"
        onChange={() => handleRadioChange(true)} />
        <label>True</label>
      </div>
      <div>
        <input checked={!trueFalse} type="radio" name="trueFalse"
        onChange={() => handleRadioChange(false)} />
        <label>False</label>
      </div>
    </div>
  );
}

export default TrueFalse;
