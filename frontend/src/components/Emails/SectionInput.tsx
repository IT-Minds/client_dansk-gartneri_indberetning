import { Box, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC } from "react";

import { Section } from "./ExtendedMailEditor";

interface Props {
  index: number;
  section: Section;
}

const SectionInput: FC<Props> = ({ index, section }) => {
  const { t } = useLocales();

  return (
    <Box shadow="md" p="20px">
      <Heading size="md" color="gray.300" float="right">
        Afsnit {index}
      </Heading>
      <Input
        variant="flushed"
        value={section.h ?? ""}
        placeholder="Overskrift her"
        fontWeight="bold"
        fontSize="1.3em"
        onChange={e => section.setH(e.target.value)}
      />
      <Textarea
        variant="unstyled"
        value={section.p ?? ""}
        placeholder="Brødtekst her"
        onChange={e => section.setP(e.target.value)}
      />
    </Box>
  );
};
export default SectionInput;
