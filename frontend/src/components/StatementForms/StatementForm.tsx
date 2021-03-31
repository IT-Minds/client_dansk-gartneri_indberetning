import {
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { setAuthToken } from "hooks/useAuth";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {}

const StatementForm: FC<Props> = ({}) => {
  const { t } = useLocales();
  const { activeUser } = useContext(AuthContext);
  const { register, handleSubmit, watch, errors } = useForm();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    console.log(e);
  }, []);

  return (
    <form>
      <Stack></Stack>
    </form>
  );
};
export default StatementForm;
