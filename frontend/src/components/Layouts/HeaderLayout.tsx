import { Grid } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface Props {
  header: ReactNode;
  main: ReactNode;
}

const HeaderLayout: FC<Props> = (props: Props) => {
  return (
    <Grid gridTemplateRows="40px auto">
      {props.header}
      {props.main}
    </Grid>
  );
};
export default HeaderLayout;
