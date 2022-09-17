import { Box, Flex, Stack } from "@chakra-ui/react";
import { InputControl, SelectControl, SubmitButton } from "../../../components";
import { NextPage } from "next";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/router";
import { ISite, SiteSchema } from "../../../schema/site.schema";
import { trpc } from "../../../utils/trpc";

const initialValues = {
  site: "",
  alias: "",
  role: "sanitary",
  description: "",
};

const CreateSitePage: NextPage = () => {
  const router = useRouter();
  const mutation = trpc.site.add.useMutation();

  return (
    <div>
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md">
          Create Site
        <Formik
          initialValues={initialValues}
          onSubmit={async(values: ISite) => {
            mutation.mutate(values);
            console.log(values)
            router.push("/site");
          }}
          validationSchema={toFormikValidationSchema(SiteSchema)}
        >
          {({ handleSubmit }) => (
            <Stack
              spacing={5}
              borderWidth="1px"
              rounded="lg"
              shadow="1px 1px 3px rgba(0,0,0,0.3)"
              maxWidth={400}
              p={6}
              m="10px auto"
              as="form"
              onSubmit={handleSubmit as any}
            >
              <InputControl
                name="site"
                label="Site"
                inputProps={{ autoComplete: "off" }}
              />
              <InputControl
                name="alias"
                label="Alias"
                inputProps={{ autoComplete: "off" }}
              />
              <SelectControl
                label="Select label"
                name="role"
                selectProps={{ placeholder: 'Select option' }}
              >
                <option value="storm">storm</option>
                <option value="sanitary">sanitary</option>
                <option value="field">field</option>
                <option value="other">Other</option>
                <option disabled value="">(Select a Role)</option>
              </SelectControl>
              <InputControl
                name="description"
                label="Description"
                inputProps={{ autoComplete: "off"}}
              />
              <SubmitButton>Submit</SubmitButton>
            </Stack>
          )}
        </Formik>
        </Box>
      </Flex>
    </div>
  );
};

export default CreateSitePage;