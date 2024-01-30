import { useState } from "react";
import { useUser } from "../../context/UserProvider";
import Autosuggest from "react-autosuggest";

const getSuggestions = (value, users) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : users.filter(user =>
        user.name.toLowerCase().slice(0, inputLength) === inputValue ||
        user.surname.toLowerCase().slice(0, inputLength) === inputValue
    );
}

const getSuggestionValue = suggestion => suggestion.name + ' ' + suggestion.surname;

const renderSuggestion = suggestion => {
    return (
        <div>
            {`${suggestion.name}, ${suggestion.surname}`}
        </div>
    )
};

export default function UserLookup({ users }) {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { setUser } = useUser();

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value, users));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Type a name',
        value,
        onChange: (event, { newValue }) => {
            console.log(event);
            onChange(event, { newValue })
        }
    };

    return (
        <div className='user-lookup'>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                onSuggestionSelected={(event, { suggestion }) => setUser(suggestion)}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        </div>
    )
}
