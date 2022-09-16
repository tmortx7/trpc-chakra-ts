import { Container } from "@chakra-ui/react"
import { NextPage } from "next"
import { trpc } from "../utils/trpc";

const HomePage: NextPage = () => {
  const healthQuery = trpc.health.healthz.useQuery();
  return(
    <Container maxW = "2xl" centerContent>
      <div>{healthQuery.data}</div>
    </Container>
  )
}

export default HomePage;