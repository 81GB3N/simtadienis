import { useIntl } from "react-intl";
import { forwardRef } from "react";

const FormInput = forwardRef(function({ id, customClassNames, onValueChange, inputValue, ...props }, ref){
    const intl = useIntl();

    const textIdList = ['name', 'surname'];
    
    return (
        <input
            className={`form-input form-${id} ${customClassNames ? customClassNames : ''}`}
            type={`${textIdList.includes(id) ? 'text' : 'password'}`}
            placeholder={intl.formatMessage({ id: id })}
            id={id}
            required
            onChange={onValueChange}
            value={inputValue}
            ref={ref}
            {...props}
        /> 
    )
})

export default FormInput;