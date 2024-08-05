import { gql } from "@apollo/client";



class FetchDetails {
  public GET_LOCATIONS = gql`

query GetUsers {
    getUsers {
        username
        email
    }
}
`;


}

export { FetchDetails }


export const ApiClient = new FetchDetails()

