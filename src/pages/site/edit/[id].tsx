import { Box, Flex, Stack } from "@chakra-ui/react";
import { InputControl, SelectControl, SubmitButton } from "../../../components";
import { NextPage } from "next";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import router, { useRouter } from "next/router";
import NextError from "next/error";
import { IEditSite, SiteSchema } from "../../../schema/site.schema";
import { trpc } from "../../../utils/trpc";
import React from "react";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react/ssg";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { appRouter } from "../../../server/routers/_app";

const EditSitePage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const utils = trpc.useContext();
  const mutation = trpc.site.edit.useMutation({
    async onSuccess() {
      await utils.site.list.invalidate();
    },
  });

  const id = useRouter().query.id as string;
  const siteQuery = trpc.site.byId.useQuery({ id });

  if (siteQuery.error) {
    return (
      <NextError
        title={siteQuery.error.message}
        statusCode={siteQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (siteQuery.status !== "success") {
    return <>Loading...</>;
  }
  const { data } = siteQuery;

  return (
    <div>
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md">
          Create Site
          <Formik
            initialValues={{
              id: data.id,
              site: data.site,
              alias: data.alias,
              role: data.role,
              description: data.description,
            }}
            onSubmit={async (values: IEditSite) => {
              mutation.mutate(values);
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
                </SelectControl>
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

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const id = context.params?.id as string;
  // Prefetch `post.byId`
  await ssg.site.byId.fetch({ id });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

export default EditSitePage;
