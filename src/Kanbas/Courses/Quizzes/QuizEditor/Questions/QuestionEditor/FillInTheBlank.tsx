import { BsTrash3Fill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOption, deleteOption, addOption } from "../reducer";

function FillInTheBlank() {
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
          <label>Possible Answer</label>
          <input
            className="ms-2"
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

export default FillInTheBlank;
