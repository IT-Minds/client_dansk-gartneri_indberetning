import { FormControl, Input, InputGroup, InputLeftAddon, Stack, Tooltip } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IEmailDto } from "services/backend/nswagts";

import SectionInput from "./SectionInput";

interface Props {
  email: IEmailDto;
  setEmail: (state: IEmailDto) => void;
  variant?: "endCTAButton";
}

export type Section = {
  h: string;
  p: string;
  setH: (h: string) => void;
  setP: (p: string) => void;
};

const EditEmailForm: FC<Props> = ({ email, setEmail, variant }) => {
  const { t } = useLocales();

  const sections: Section[] = [
    {
      h: email.heading1,
      p: email.paragraph1,
      setH: h => setEmail({ ...email, ...{ heading1: h } }),
      setP: p => setEmail({ ...email, ...{ paragraph1: p } })
    },
    {
      h: email.heading2,
      p: email.paragraph2,
      setH: h => setEmail({ ...email, ...{ heading2: h } }),
      setP: p => setEmail({ ...email, ...{ paragraph2: p } })
    },
    {
      h: email.heading3,
      p: email.paragraph3,
      setH: h => setEmail({ ...email, ...{ heading3: h } }),
      setP: p => setEmail({ ...email, ...{ paragraph3: p } })
    }
  ];

  return (
    <Stack>
      <Tooltip label={t("mailEditor.nameTooltip")} aria-label="A tooltip" placement="auto-end">
        <FormControl id="name">
          <InputGroup>
            <InputLeftAddon w="110px">{t("mailEditor.name")}</InputLeftAddon>
            <Input
              value={email.name}
              onChange={e => setEmail({ ...email, ...{ name: e.target.value } })}></Input>{" "}
          </InputGroup>
        </FormControl>
      </Tooltip>
      <Tooltip label={t("mailEditor.subjectTooltip")} aria-label="A tooltip" placement="auto-end">
        <FormControl id="subject">
          <InputGroup>
            <InputLeftAddon w="110px">{t("mailEditor.subject")}</InputLeftAddon>
            <Input
              value={email.subject}
              onChange={e => setEmail({ ...email, ...{ title: e.target.value } })}></Input>
          </InputGroup>
        </FormControl>
      </Tooltip>
      {variant == "endCTAButton" && (
        <Tooltip label={t("mailEditor.ctaTooltip")} aria-label="A tooltip" placement="auto-end">
          <FormControl id="ctaButton">
            <InputGroup>
              <InputLeftAddon w="110px">{t("mailEditor.ctaButtonInputLabel")}</InputLeftAddon>
              <Input
                value={email.ctaButtonText}
                onChange={e =>
                  setEmail({ ...email, ...{ ctaButtonText: e.target.value } })
                }></Input>
            </InputGroup>
          </FormControl>
        </Tooltip>
      )}
      {sections.map((section, i) => (
        <SectionInput key={i} section={section} index={i + 1} />
      ))}
    </Stack>
  );
};
export default EditEmailForm;
