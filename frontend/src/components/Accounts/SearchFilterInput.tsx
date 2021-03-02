import { Box, Button, Flex, Grid, Heading, IconButton, Input, Text } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback, useContext, useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchFilterInput: FC<Props> = (props: Props) => {
  const { t } = useLocales();
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  }, []);

  return (
    <Input value={props.value} onChange={handleChange} placeholder={t("common.search")}></Input>
  );
};
export default SearchFilterInput;
