import { IconButton, Tooltip } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { BiMessageRoundedError } from "react-icons/bi";

const RemindBtn: FC = () => {
  const { t } = useLocales();

  return (
    <Tooltip label="Send reminder">
      <IconButton aria-label="Remind to fill statement" icon={<BiMessageRoundedError />} />
    </Tooltip>
  );
};
export default RemindBtn;
