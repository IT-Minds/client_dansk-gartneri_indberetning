import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack
} from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { FC, useCallback, useContext, useState } from "react";
import { BsLock, BsPerson } from "react-icons/Bs";
import { LoginRequestDto } from "services/backend/nswagts";

const LoginForm: FC = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      login(
        new LoginRequestDto({
          email: email,
          password: password
        })
      );
    },
    [email, password, login]
  );

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit}>
        <Stack w="100%">
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
    </Box>
  );
};
export default LoginForm;
