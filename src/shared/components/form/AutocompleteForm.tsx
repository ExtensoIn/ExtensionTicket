import ControlledInput from './ControlledInput';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

type AutocompleteFormProps = {
    name: string;
    label?: string;
    items: { label: string, value: string }[]
}

function AutocompleteForm({ name, label, items }: AutocompleteFormProps) {
    return (
        <ControlledInput name={name}>
            {({ onChange, value }) => (
                <Autocomplete label={label} defaultItems={items} selectedKey={value} onSelectionChange={onChange}>
                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                </Autocomplete>
            )}
        </ControlledInput>
    )
}

export default AutocompleteForm
