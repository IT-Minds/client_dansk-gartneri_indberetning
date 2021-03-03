import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack
} from "@chakra-ui/react";
import { FC, useCallback, useState } from "react";
import { BsLock, BsPerson } from "react-icons/Bs";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <FormControl isRequired={true} colorScheme="green">
          <FormLabel htmlFor="email">Email:</FormLabel>
          <InputGroup>
            <InputRightElement>
              <BsPerson />
            </InputRightElement>
            <Input id="email" type="email" value={email} onChange={handleEmailChange}></Input>
          </InputGroup>
        </FormControl>
        <FormControl isRequired={true}>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <InputGroup>
            <InputRightElement>
              <BsLock />
            </InputRightElement>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}></Input>
          </InputGroup>
        </FormControl>
        <Button type="submit" colorScheme="blue" w="100%">
          Log ind
        </Button>
        <Center textColor="blue.400" mt={2}>
          Glemt kodeord?
        </Center>
      </Stack>
    </form>
  );
};
export default LoginForm;
