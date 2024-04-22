let stringArray1 = ['string1', 'string3'];
let stringArray2:string[] = [];
for (let i = 0;
    i < stringArray1.length;
    i++) {
const string1 = stringArray1[i];
stringArray2.push(
    string1.toUpperCase());
}

function ForLoops() {
    return(
        <div>
            <h1>Looping through array</h1>
            stringArray2 = {stringArray2}<br />
        </div>
    )
}

export default ForLoops;
