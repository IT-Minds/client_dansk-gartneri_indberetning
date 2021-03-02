import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Text
} from "@chakra-ui/react";
import { FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

const BasicWrapper: FC<Props> = (props: Props) => {
  return (
    <Grid gridTemplateColumns="1fr minmax(400px, 1000px) 1fr">
      <GridItem colStart={2} w="100%" p={5}>
        {props.children}
      </GridItem>
    </Grid>
  );
};
export default BasicWrapper;
