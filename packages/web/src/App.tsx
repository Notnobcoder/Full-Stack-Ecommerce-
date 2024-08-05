import { Application } from "./pages/Application"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"


const client = new ApolloClient({
  uri: 'http://localhost:9000/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: "cache-first"
    }
  }
});
function App() {
  return (

    <>
      <ApolloProvider client={client}>
        <Application />
      </ApolloProvider>
    </ >
  )
}

export default App
