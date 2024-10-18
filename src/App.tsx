import { SubmitHandler, useForm } from "react-hook-form"
import "./App.css"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

//* Steps:
// import useForm from rhf:
//const { register } = useForm()

// declare typescript types

// register types on input fields

// create onSubmit func and bind it with handleSubmit coming from rhf

// you can set input validation directly from rhf by doing something like this:
// {...register("email", { required: "Email is required" })}

// you can also get the form loading state by formState: { isSubmitting }

// we can set errors coming from backend by using setError from useForm() hook

// we can set default values to an input by useForm({
//   defaultValues: {
//     email: "@",
//     password: "1234"
//   }
// })

//? npm i @hookform/resolvers
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// then infer types directly from the above schema
type FormFields = z.infer<typeof schema>

// then connect this form schema via zod to react hook form by adding:
// resolver: zodResolver(schema),
// inside the useForm() hook

// remove rhf default validation that was done before

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "@",
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // throw new Error()
      console.log(data)
    } catch (error) {
      setError("email", { message: "Email is already taken" })
      console.log(error)
    }
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-lg pb-8 text-red-500">
        Welcome to React hook form with Zod app
      </h1>

      <form
        className="flex flex-col w-[300px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="">Email</label>
        <input
          {...register("email")}
          type="text"
          placeholder="Enter email.."
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <label htmlFor="">Password</label>
        <input
          {...register("password")}
          type="password"
          placeholder="Enter password"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting" : "Submit"}
        </button>

        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  )
}

export default App
