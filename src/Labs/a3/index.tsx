import Add from "./Add";
import Classes from "./Classes";
import ConditionalOutput from "./ConditionalOutput";
import Highlight from "./Highlight";
import JavaScript from "./JavaScript";
import Styles from "./Styles";
import PathParameters from "./routing/PathParameters";
import TodoItem from "./todos/TodoItem";
import TodoList from "./todos/TodoList";

function Assignment3 (){
    return (
        <div className="container">
            <h2>Assignment 3</h2>
            <ConditionalOutput/>
            <Styles />
            <Classes />
            <PathParameters />
            <h3>Arrays</h3>
            <h3>Objects</h3>
            <JavaScript />
            <Highlight>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
                vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
            </Highlight>
            <Add a={3} b={4} />
            <TodoItem />
            <TodoList />
        </div>
    );
}

export default Assignment3;