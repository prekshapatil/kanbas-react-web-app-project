const square  = (a: number) => a * a;
const plusOne = (a: number) => a + 1;
const twoSquared = square(2);
const threePlusOne = plusOne(3);

const ParanthesisAndParameters = () => {
    return (
        <div>
            <h1>Parenthesis and parameters</h1>
            twoSquared = {twoSquared}<br/>
            square(2) = {square(2)}<br/>
            threePlusOne = {threePlusOne}<br/>
            plusOne(3) = {plusOne(3)}<br/>
        </div>
    );
}

export default ParanthesisAndParameters;