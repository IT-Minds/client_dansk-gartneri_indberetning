import {
  Input,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useEffect } from "react";

interface Props {
  value: number;
  onChange: (value: string) => void;
}

const InputDKK: FC<Props> = ({ value, onChange }) => {
  const { t } = useLocales();
  return <Input type="number" value={value} onChange={e => onChange(e.target.value)}></Input>;
};
export default InputDKK;
/*
<NumberInput min={0} precision={0} w="100%">
      <NumberInputField value={value} onChange={e => onChange(e.target.value)} />
    </NumberInput>
<Input value={value} onChange={e => onChange(e.target.value)} type="number"></Input>;
<InputGroup>
      <NumberInput min={0} precision={0} w="100%">
        <NumberInputField
          roundedEnd="none"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </NumberInput>
      <InputRightAddon>Kr.</InputRightAddon>
    </InputGroup>
*/
