import { Box, Button, Flex, Grid, Heading, IconButton, Input, Text } from "@chakra-ui/react";
import { FC, useCallback, useContext, useEffect, useState } from "react";

import ChangePasswordForm from "./ChangePasswordForm";
import ChangePasswordModal from "./ChangePasswordModal";

interface Props {
  className?: string;
}

const ChangePassword: FC<Props> = (props: Props) => {
  return (
    <>
      <ChangePasswordModal />
      <ChangePasswordForm
        onSubmit={() => {
          return;
        }}
      />
    </>
  );
};
export default ChangePassword;
