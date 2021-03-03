import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text
} from "@chakra-ui/react";
import { FC } from "react";
import { BsLock, BsPerson } from "react-icons/Bs";

interface Props {
  className?: string;
}

const LoginForm: FC<Props> = (props: Props) => {
  return (
    <form>
      <Stack>
        <FormControl isRequired={true} colorScheme="green">
          <FormLabel htmlFor="email">Email:</FormLabel>
          <InputGroup>
            <InputRightElement>
              <BsPerson />
            </InputRightElement>
            <Input id="email" type="email"></Input>
          </InputGroup>
        </FormControl>
        <FormControl isRequired={true}>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <InputGroup>
            <InputRightElement>
              <BsLock />
            </InputRightElement>
            <Input id="password" type="password"></Input>
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
