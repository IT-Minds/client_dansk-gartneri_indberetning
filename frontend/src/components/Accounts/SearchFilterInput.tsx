import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchFilterInput: FC<Props> = (props: Props) => {
  const { t } = useLocales();
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    props.onChange("");
  }, []);

  return (
    <Box maxW="400px">
      <InputGroup>
        <InputLeftElement>
          <BiSearch opacity="0.4" />
        </InputLeftElement>
        <Input value={props.value} onChange={handleChange} placeholder={t("common.search")}></Input>
        <InputRightElement>
          <IconButton
            aria-label="Clear"
            icon={<MdClear opacity="0.4" />}
            onClick={handleClear}
            variant="ghost"
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
export default SearchFilterInput;
