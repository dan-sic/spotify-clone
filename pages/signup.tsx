import { Button } from '@/shared/components/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/card'
import { FormErrorMessage } from '@/shared/components/form'
import { authSchema } from '@/shared/validation-schemas/auth-schema'
import { AuthForm } from '@/modules/auth/components/auth-form'
import { AuthLayout } from '@/modules/auth/components/auth-layout'
import { useSignup } from '@/modules/auth/hooks/use-signup'
import { z } from 'zod'

const SignupPage = () => {
  const { signup, signUpError } = useSignup()

  const onSubmit = (data: z.infer<typeof authSchema>) => signup(data)

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm onSubmit={onSubmit} />
        {signUpError && (
          <FormErrorMessage className="mt-4">{signUpError}</FormErrorMessage>
        )}
      </CardContent>
      <CardFooter>
        <Button form="auth-form" type="submit">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}

SignupPage.getLayout = (page: React.ReactNode) => (
  <AuthLayout>{page}</AuthLayout>
)

export default SignupPage
