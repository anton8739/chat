
export let required = (value:any) => {
    if (value) {
        return undefined;
    } else {
        return "Field is required";
    }
}
export let maxLength20 = (value:any) => {
    if(value.length < 20) {
        return undefined;
    } else {
        return `Max length is ${20}`;
    }
}