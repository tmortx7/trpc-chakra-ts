import { Box, Flex, Stack } from "@chakra-ui/react";
import { InputControl, SelectControl, SubmitButton } from "../../../components";
import { NextPage } from "next";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/router";
import { IArea, AreaSchema } from "../../../schema/area.schema";
import { trpc } from "../../../utils/trpc";

const initialValues = {
  siteId: "",
  alias: "",
  description: "",
};

const CreateAreaPage: NextPage = () => {
  const router = useRouter();
  const mutation = trpc.area.add.useMutation();
  const siteQuery = trpc.site.list.useQuery();

  const { data } = siteQuery;

  return (
    <div>
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md">
          Create Area
          <Formik
            initialValues={initialValues}
            onSubmit={async (values: IArea) => {
              mutation.mutate(values);
              console.log(values);
              router.push("/area");
            }}
            validationSchema={toFormikValidationSchema(AreaSchema)}
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
                <SelectControl
                  label="Site"
                  name="siteId"
                  selectProps={{ placeholder: "Select site" }}
                >
                  {data?.map((sitex: any) => (
                    <option value={sitex.id}>{sitex.site}</option>
                  ))}
                </SelectControl>
                <InputControl
                  name="alias"
                  label="Alias"
                  inputProps={{ autoComplete: "off" }}
                />

                <InputControl
                  name="description"
                  label="Description"
                  inputProps={{ autoComplete: "off" }}
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

export default CreateAreaPage;
