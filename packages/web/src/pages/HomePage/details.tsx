import { useQuery } from "@apollo/client";
import { ApiClient } from "../../ApiClient/fetch.apiClient";
import { GetUsersResponse } from "../../utils/types.utils";

export const Details = () => {
  const { loading, error, data } = useQuery<GetUsersResponse>(ApiClient.GET_LOCATIONS)


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="p-4">
      <h4 className="text-3xl my-4">Details Image</h4>
      <div className="">
        {data?.getUsers.map((_) => (
          <div>
            <h4 className="text-sm font-bold capitalize">{_.username}</h4>
          </div>
        ))}
      </div>

    </div>
  )
}
