import { Checkbox, ScrollArea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ReactElement } from "react";
import { authorization, responsibility, lgpd } from "../data/terms.js";

export default function Page1({
  page3,
}: {
  page3: UseFormReturnType<{
    enroll: {
      terms: { authorization: boolean; responsibility: boolean; lgpd: boolean };
    };
  }>;
}): ReactElement {
  return (
    <>
      <Checkbox.Group
        mt="md"
        label="Termo de Autorização"
        value={[page3.values.enroll.terms.authorization.toString()]}
        onChange={(values) => {
          page3.setFieldValue("enroll.terms.authorization", Boolean(values[1]));
        }}
        description={
          <ScrollArea style={{ height: 60 }}>{authorization}</ScrollArea>
        }
      >
        <Checkbox value="true" label="Li e concordo" />
      </Checkbox.Group>
      <Checkbox.Group
        mt="md"
        label="Termo de Responsabilidade"
        withAsterisk
        value={[page3.values.enroll.terms.responsibility.toString()]}
        error={page3.errors["enroll.terms.responsibility"]}
        onChange={(values) => {
          page3.setFieldValue(
            "enroll.terms.responsibility",
            Boolean(values[1])
          );
        }}
        description={
          <ScrollArea style={{ height: 60 }}>{responsibility}</ScrollArea>
        }
      >
        <Checkbox value="true" label="Li e concordo" />
      </Checkbox.Group>

      <Checkbox.Group
        mt="md"
        label="Termo de Consentimento"
        error={page3.errors["enroll.terms.lgpd"]}
        withAsterisk
        value={[page3.values.enroll.terms.lgpd.toString()]}
        onChange={(values) => {
          page3.setFieldValue("enroll.terms.lgpd", Boolean(values[1]));
        }}
        description={<ScrollArea style={{ height: 60 }}>{lgpd}</ScrollArea>}
      >
        <Checkbox value="true" label="Li e concordo" />
      </Checkbox.Group>
    </>
  );
}
