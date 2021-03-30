import {
  Box,
  Divider,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
  Tooltip
} from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IEmailDto } from "services/backend/nswagts";

interface Props {
  state: IEmailDto;
  setState: (state: IEmailDto) => void;
  variant?: "endCTAButton";
}

const ExtendedMailEditor: FC<Props> = ({ state, setState, variant }) => {
  const { t } = useLocales();

  return (
    <Stack>
      <Tooltip label={t("mailEditor.nameTooltip")} aria-label="A tooltip" placement="auto-end">
        <FormControl id="name">
          <InputGroup>
            <InputLeftAddon w="110px">{t("mailEditor.name")}</InputLeftAddon>
            <Input
              value={state.name}
              onChange={e => setState({ ...state, ...{ name: e.target.value } })}></Input>{" "}
          </InputGroup>
        </FormControl>
      </Tooltip>
      <Tooltip label={t("mailEditor.subjectTooltip")} aria-label="A tooltip" placement="auto-end">
        <FormControl id="subject">
          <InputGroup>
            <InputLeftAddon w="110px">{t("mailEditor.subject")}</InputLeftAddon>
            <Input
              value={state.subject}
              onChange={e => setState({ ...state, ...{ title: e.target.value } })}></Input>
          </InputGroup>
        </FormControl>
      </Tooltip>
      {variant == "endCTAButton" && (
        <Tooltip label={t("mailEditor.ctaTooltip")} aria-label="A tooltip" placement="auto-end">
          <FormControl id="ctaButton">
            <InputGroup>
              <InputLeftAddon w="110px">{t("mailEditor.ctaButtonInputLabel")}</InputLeftAddon>
              <Input
                value={state.ctaButtonText}
                onChange={e =>
                  setState({ ...state, ...{ ctaButtonText: e.target.value } })
                }></Input>
            </InputGroup>
          </FormControl>
        </Tooltip>
      )}
      <Box shadow="md" p="20px">
        <Heading size="md" color="gray.300" float="right">
          Afsnit 1
        </Heading>
        <Input
          variant="flushed"
          value={state.heading1}
          fontWeight="bold"
          fontSize="1.3em"
          onChange={e => setState({ ...state, ...{ heading1: e.target.value } })}
        />
        <Textarea
          variant="unstyled"
          value={state.paragraph1}
          onChange={e => setState({ ...state, ...{ paragraph1: e.target.value } })}
        />
      </Box>
    </Stack>
  );
};
export default ExtendedMailEditor;
/*
 <InputGroup>
        <InputLeftAddon>Overskrift 1</InputLeftAddon>
        <Input
          value={state.heading1}
          onChange={e => setState({ ...state, ...{ heading1: e.target.value } })}
        />
      </InputGroup>
      <Textarea
        value={state.paragraph1}
        onChange={e => setState({ ...state, ...{ paragraph1: e.target.value } })}
      />
      <InputGroup>
        <InputLeftAddon>Overskrift 2</InputLeftAddon>
        <Input
          value={state.heading2}
          onChange={e => setState({ ...state, ...{ heading2: e.target.value } })}
        />
      </InputGroup>
      <Textarea
        value={state.paragraph2}
        onChange={e => setState({ ...state, ...{ paragraph2: e.target.value } })}
      />
      <InputGroup>
        <InputLeftAddon>Overskrift 1</InputLeftAddon>
        <Input
          value={state.heading3}
          onChange={e => setState({ ...state, ...{ heading3: e.target.value } })}
        />
      </InputGroup>
      <Textarea
        value={state.paragraph3}
        onChange={e => setState({ ...state, ...{ paragraph3: e.target.value } })}
      />

*/
