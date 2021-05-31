
import React  from "react";
// @ts-ignore
const FormControl = ({input, meta, ...props}) => {
    let haserror = meta.touched && meta.error;

    return (
        <div>
            <div className={(haserror ? props.errorClass : " ")}>
                {props.children}
            </div>
            <span className={props.textClass}>{haserror ? meta.error : null}</span>
        </div>
    )
}

// @ts-ignore
export let Input = ({input, meta, ...props}) => {

    return (
        <div>
            <FormControl meta={meta} input={input}  {...props}><input className={props.formControlClass } {...input} {...props} /></FormControl>
        </div>

    )
}