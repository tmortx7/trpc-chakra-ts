import { Container } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";

const SitesPage: NextPage = () => {
  const siteQuery = trpc.site.list.useQuery();
  return (
    <Container maxW="2xl" centerContent>
       <h2>
        Posts
        {siteQuery.status === 'loading' && '(loading)'}
      </h2>
      <div>
        {siteQuery.data?.map((item:any) => (
          <article key={item.id}>
            <h3>{item.site}</h3>
            <h3>{item.id}</h3>
          </article>
        ))}
      </div>
    </Container>
  );
};

export default SitesPage;
