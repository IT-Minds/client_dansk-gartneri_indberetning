import { InputGroup, InputRightAddon, NumberInput, NumberInputField } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

interface Props {
  value: number;
  onChange: (value: string) => void;
}
//(...event: any[]) => void;

const InputDKK: FC<Props> = ({ value, onChange }) => {
  const { t } = useLocales();

  return (
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
  );
};
export default InputDKK;
