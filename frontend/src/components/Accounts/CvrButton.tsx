import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useCallback } from "react";
import { CVRClient, ICVRDataDto } from "services/cvr/api";

interface Props {
  cvrNumber: string;
  onClick: (data: ICVRDataDto) => void;
}

const CvrButton: FC<Props> = ({ cvrNumber, onClick }) => {
  const { t } = useLocales();
  const toast = useToast();
  const handleGetFromCvr = useCallback(async () => {
    const cvrClient = new CVRClient();
    const result = await cvrClient.getDataFromCVR(cvrNumber);
    if (result != null) {
      onClick(result);
    } else {
      toast({
        title: t("accounts.CVR_apiErrorTitle"),
        description: t("accounts.CVR_apiErrorDescription"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }, [onClick]);

  return (
    <Button onClick={handleGetFromCvr} variant="ghost" size="xs">
      {t("accounts.CVR_getFromRegistry")}
    </Button>
  );
};
export default CvrButton;
