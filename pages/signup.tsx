import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FormErrorMessage } from '@/components/ui/form'
import { authSchema } from '@/lib/validation-schemas/auth-schema'
import { AuthForm } from '@/components/auth-form'
import { AuthLayout } from '@/components/auth-layout'
import { useSignup } from '@/hooks/use-signup'
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
