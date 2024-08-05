import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";



// Define the SignUp mutation
const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    SignUp(input: $input) {
      username
      email
      password
    }
  }
`;

// Define the types for the mutation response and variables
interface SignUpResponse {
  SignUp: {
    username: string;
    email: string;
    password: string;
  };
}

interface SignUpVariables {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface FormInputs {
  username: string;
  email: string;
  password: string;
}
export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()
  const [signUp, { data, loading, error }] = useMutation<SignUpResponse, SignUpVariables>(SIGN_UP_MUTATION);

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    console.log(formData, "fffff")
    signUp({ variables: { input: formData } })
      .then(response => {
        console.log("Sign Up successful", response);
      })
      .catch(err => {
        console.error("Sign Up error", err);
      });
  };
  return (
    <div>
      <form onClick={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      {...register("username", { required: "Username is required" })}
                      placeholder="Username"
                      id="username"
                      name="username"
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      {...register("email", { required: "Email is required" })}
                      id="email"
                      name="email"
                      type="text"
                      placeholder="janesmith@gmail.com"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      {...register("password", { required: "Password is required" })}
                      id="password"
                      name="password"
                      type="text"
                      placeholder="************"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button

            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Signed up successfully!</p>}
    </div>
  )
}
