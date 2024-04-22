import BooleanVariables from "./Variables/BooleanVariables";
import IfElse from "./Variables/IfElse";
import VariableTypes from "./Variables/VariableTypes";
import VariablesAndConstants from "./Variables/VariablesAndConstants";
import AddingAndRemovingData from "./arrays/AddingAndRemovingDataToFromArrays";
import IndexAndLength from "./arrays/ArrayIndexAndLength";
import FilterFunction from "./arrays/FilterFunction";
import FindFunction from "./arrays/FindFunction";
import FindIndex from "./arrays/FindIndex";
import ForLoops from "./arrays/ForLoops";
import MapFunction from "./arrays/MapFunction";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import TernaryOperator from "./conditionals/TernaryOperator";
import ArrowFunctions from "./functions/ArrowFunctions";
import ES5Functions from "./functions/ES5Functions";
import FunctionDestructing from "./functions/FunctionDestructing";
import ImpliedReturn from "./functions/ImpliedReturn";
import WorkingWithFunctions from "./functions/WorkingWithFunctions";
import ParanthesisAndParameters from "./functions/unctionParenthesisAndParameters";
import Destructing from "./json/Destructing";
import House from "./json/House";
import JsonStringify from "./json/JsonStringify";
import Spreading from "./json/Spreading";
import TemplateLiterals from "./string/TempLateLiterals";

function JavaScript() {
    console.log('Hello World!');
    return(
       <div>
          <h1>JavaScript</h1>
          <VariablesAndConstants />
          <VariableTypes />
          <BooleanVariables />
          <IfElse />
          <TernaryOperator />
          <WorkingWithFunctions />
          <ES5Functions />
          <ArrowFunctions />
          <ImpliedReturn />
          <ParanthesisAndParameters />
          <WorkingWithArrays />
          <IndexAndLength />
          <AddingAndRemovingData />
          <ForLoops />
          <MapFunction />
          <JsonStringify />
          <FindFunction />
          <FindIndex />
          <FilterFunction />
          <TemplateLiterals />
          <House />
          <Spreading />
          <Destructing />
          <FunctionDestructing />
       </div>
    );
 }
 export default JavaScript