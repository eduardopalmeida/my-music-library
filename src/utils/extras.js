// Waits 1.5 seconds before 
export const refresh = (path, history) => {
    setTimeout(() => history.push(path), 1500);
};

// sorts arrays with the indicated array of fields
export const fieldSorter = (fields) => (a, b) => fields.map(o => {
    let dir = 1;
    if (o[0] === '-') { dir = -1; o=o.substring(1); }
    return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
}).reduce((p, n) => p ? p : n, 0);


// shortens a string longer than nChars by adding '...'
export const shortText = (text, nChars) => {
    let shortened = text;

    if(text.length > nChars) {
        shortened = text.substring(0, nChars - 3) + "...";
    }
    return shortened;
}