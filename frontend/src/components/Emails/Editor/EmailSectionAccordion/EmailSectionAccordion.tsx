import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IEmailDto } from "services/backend/nswagts";

import SectionInput from "./SectionInput";

interface Props {
  email: IEmailDto;
  setEmail: (state: IEmailDto) => void;
}

export type Section = {
  h: string;
  p: string;
  setH: (h: string) => void;
  setP: (p: string) => void;
};

const EmailSectionAccordion: FC<Props> = ({ email, setEmail }) => {
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
    <Accordion defaultIndex={[0]} allowMultiple>
      {sections.map((section, i) => (
        <AccordionItem key={i}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Afsnit {i}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <SectionInput section={section} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
export default EmailSectionAccordion;
