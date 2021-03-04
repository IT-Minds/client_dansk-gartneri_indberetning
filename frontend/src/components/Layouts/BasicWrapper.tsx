import { Grid, GridItem } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

const BasicWrapper: FC<Props> = (props: Props) => {
  return (
    <Grid gridTemplateColumns="1fr minmax(400px, 90vw) 1fr">
      <GridItem colStart={2} w="100%" p={5}>
        {props.children}
      </GridItem>
    </Grid>
  );
};
export default BasicWrapper;
