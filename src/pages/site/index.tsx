import type { NextPage } from "next";
import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const SiteListPage: NextPage = () => {
   const utils = trpc.useContext();
  const mutation = trpc.site.delete.useMutation({
    async onSuccess() {
      await utils.site.list.invalidate();
    }
  });
  const { data, isLoading } = trpc.site.list.useQuery();
  if (isLoading) {
    return <p> Loading...</p>;
  }

  function deleteSite(value:any) {
    alert(value)
    mutation.mutate(value);
  }


  return (
    <div>
      <Head>
        <title>List of Sites</title>
        <meta name="description" content="sites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
          <Box>
            <TableContainer>
              <Table variant='striped' colorScheme='gray 300'>
                <Thead>
                  <Tr>
                    <Th>Site</Th>
                    <Th>Alias</Th>
                    <Th>Role</Th>
                    <Th>Description</Th>
                    <Th>Edit</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map(({ id, site, alias, role, description }) => (
                    <Tr key={id}>
                      <Td>{site}</Td>
                      <Td>{alias}</Td>
                      <Td>{role}</Td>
                      <Td>{description}</Td>
                      <Td>
                        <Link href={`/site/edit/${id}`} >edit</Link>
                      </Td>
                      <Td>
                        <IconButton
                          aria-label='Delete Site'
                          size='sm'
                          icon={<DeleteIcon />}
                          onClick={() => mutation.mutate({ id })}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </main>
    </div>
  );
};

export default SiteListPage;
