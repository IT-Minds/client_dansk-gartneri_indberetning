import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
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
    <InputGroup>
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
      <InputRightAddon>Kr.</InputRightAddon>
    </InputGroup>
  );
};
export default InputDKK;
