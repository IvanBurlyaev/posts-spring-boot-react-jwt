import React from 'react';

const input = (props) => {
    let inputElement = null;

    let validationError = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        validationError = <p style={{color: 'red'}}>Please enter a valid value!</p>;
    }

    const styles = props.invalid && props.shouldValidate && props.touched ? {
        border: '1px solid red',
        backgroundColor: '#FDA49A'
    } : null;

    switch (props.elementType) {
        case ( 'input' ):
            inputElement = <input {...props.elementConfig} style={styles}
                                  value={props.value}
                                  onChange={props.changed}/>;
            break;
        case ( 'textarea' ):
            inputElement = <textarea {...props.elementConfig} style={styles}
                                     value={props.value}
                                     onChange={props.changed}/>;
            break;
        case ( 'select' ):
            inputElement = (<select value={props.value}
                                    onChange={props.changed}>{props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
                </select>
            );
            break;
        default:
            inputElement = <input {...props.elementConfig} style={styles}
                                  value={props.value}
                                  onChange={props.changed}/>;
    }

    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );

};

export default input;