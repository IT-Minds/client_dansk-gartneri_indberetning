import { Box, Input, Text, Textarea } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC } from "react";

import { Section } from "./EmailSectionAccordion";

interface Props {
  section: Section;
}

const SectionInput: FC<Props> = ({ section }) => {
  const { t } = useLocales();

  return (
    <Box>
      <Input value={section.h ?? ""} onChange={e => section.setH(e.target.value)} />
      <Textarea
        whiteSpace="pre-wrap"
        value={section.p}
        onChange={e => section.setP(e.target.value)}
      />
    </Box>
  );
};
export default SectionInput;
