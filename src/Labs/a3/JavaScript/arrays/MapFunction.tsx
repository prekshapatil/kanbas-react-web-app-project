let numberArray1 = [1, 2, 3, 4, 5, 6];
const square = (a: number) => a * a;

const squares = numberArray1.map(square);
const cubes = numberArray1.map(a => a * a * a);

function MapFunction() {
    return (
        <div>
            <h1>Map</h1>
            squares = {squares}<br />
            cubes = {cubes}<br />
        </div>
    );
}

export default MapFunction;