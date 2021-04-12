import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Text
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC, useContext } from "react";
import { useController } from "react-hook-form";
import { IStatementDto } from "services/backend/nswagts";

import { FormControlContext } from "./FormControlContext";

interface Props {
  name: keyof IStatementDto;
}

const InputDKK: FC<Props> = ({ name }) => {
  const { t } = useLocales();
  const { menuBg } = useColors();

  const { control, form, updatedFormAttribute } = useContext(FormControlContext);

  const {
    field: { ref, onChange, value }
  } = useController({
    name,
    control,
    rules: { required: false, valueAsNumber: true },
    defaultValue: form[name]
  });

  return (
    <Flex>
      <Input
        name={name}
        ref={ref}
        roundedEnd="none"
        value={value}
        type="number"
        onChange={e => {
          onChange(e.target.value);
          updatedFormAttribute(name, parseInt(e.target.value));
        }}
      />
      <Text
        roundedEnd="md"
        background={menuBg}
        w="60px"
        display="flex"
        alignItems="center"
        justifyContent="center">
        Kr.
      </Text>
    </Flex>
  );
};
export default InputDKK;
