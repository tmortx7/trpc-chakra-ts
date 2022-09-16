import { Box, Stack } from "@chakra-ui/react";
import { InputControl, SubmitButton } from "../../../components";
import { NextPage } from "next";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/router";
import { ISite, SiteSchema } from "../../../schema/site.schema";
import { trpc } from "../../../utils/trpc";

const initialValues = {
  site: "",
  alias: "",
  description: "",
};

const CreateSitePage: NextPage = () => {
  const router = useRouter();
  const mutation = trpc.site.add.useMutation();

  return (
    <div>
      <div>
        <Box as="p" textAlign="center">
          Create Site
        </Box>
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
              <InputControl
                name="description"
                label="Description"
                inputProps={{ autoComplete: "off"}}
              />
              <SubmitButton>Submit</SubmitButton>
            </Stack>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateSitePage;