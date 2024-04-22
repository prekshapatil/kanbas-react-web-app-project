const multiply = (a: number, b: number) => a * b;
const fourTimesFive = multiply(4, 5);
console.log(fourTimesFive);

const ImpliedReturn = () => {
    return (
        <div>
            <h1>Implied return</h1>
            fourTimesFive = {fourTimesFive}<br/>
            multiply(4, 5) = {multiply(4,5)}<br/>
        </div>
    );
}

export default ImpliedReturn;