import { FC } from 'react';
import { InputProps } from '../Input/Input';
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (keyword: string) => string[] | Promise<string[]>;
    onSelect?: (item: string) => void;
}
declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
