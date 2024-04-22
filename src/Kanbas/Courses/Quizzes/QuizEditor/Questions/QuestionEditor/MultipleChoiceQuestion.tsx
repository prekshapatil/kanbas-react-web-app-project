import { BsTrash3Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import { addOption, updateOption,deleteOption } from "../reducer";
import { useEffect } from "react";

function MultipleChoiceQuestion() {
  const dispatch = useDispatch();

  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );

  const deleteOpt = (id: number) => {
    dispatch(deleteOption(id));
  };

  return (
    <div>
      {question.options?.map((option: any) => (
        <div key={option.id}>
          <label>Possible Answers</label>
          <input
            type="text"
            value={option.option}
            onChange={(e) =>
              dispatch(updateOption({ ...option, option: e.target.value }))
            }
          />
          <button className="btn" onClick={() => deleteOpt(option.id)}>
            <BsTrash3Fill />
          </button>
        </div>
      ))}
    </div>
  );
}
export default MultipleChoiceQuestion;
