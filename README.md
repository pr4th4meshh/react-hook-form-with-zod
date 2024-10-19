# React Hook Form with Zod Guide

This guide provides step-by-step instructions on how to use React Hook Form (RHF) with Zod for form validation in your React projects.

## Installation

First, install the required packages:

```bash
npm install react-hook-form @hookform/resolvers zod
```

## Usage Guide

1. Import `useForm` from react-hook-form:

```javascript
import { useForm } from 'react-hook-form';
```

2. Set up Zod schema for form validation:

```javascript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Infer TypeScript types from the schema
type FormFields = z.infer<typeof schema>;
```

3. Initialize the form using `useForm` hook:

```javascript
import { zodResolver } from '@hookform/resolvers/zod';

const { register, handleSubmit, formState: { isSubmitting }, setError } = useForm<FormFields>({
  resolver: zodResolver(schema),
  defaultValues: {
    email: '@',
    password: '1234'
  }
});
```

4. Create an onSubmit function and bind it with `handleSubmit`:

```javascript
const onSubmit = (data: FormFields) => {
  // Handle form submission
};
```

5. Use the `register` function to connect form fields:

```jsx
<input {...register("email")} />
<input {...register("password")} />
```

6. Handle form submission:

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
  {/* Form fields */}
</form>
```

## Additional Notes

- You can access the form's loading state using `isSubmitting` from `formState`.
- Set errors from the backend using the `setError` function from the `useForm` hook.
- Default values for inputs can be set in the `useForm` hook's options.

## Example
- For example refer: `App.tsx`