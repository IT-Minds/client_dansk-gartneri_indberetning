import { InputGroup, InputRightAddon, NumberInput, NumberInputField } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

const InputDKK: FC = () => {
  const { t } = useLocales();

  return (
    <InputGroup>
      <NumberInput min={0} precision={0} w="100%">
        <NumberInputField roundedEnd="none" />
      </NumberInput>
      <InputRightAddon>Kr.</InputRightAddon>
    </InputGroup>
  );
};
export default InputDKK;
