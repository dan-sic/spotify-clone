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
import { useSignin } from '@/modules/auth/hooks/use-signin'
import { z } from 'zod'

const SigninPage = () => {
  const { signin, signinError } = useSignin()

  const onSubmit = (data: z.infer<typeof authSchema>) => signin(data)

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm onSubmit={onSubmit} />
        {signinError && (
          <FormErrorMessage className="mt-4">{signinError}</FormErrorMessage>
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

SigninPage.getLayout = (page: React.ReactNode) => (
  <AuthLayout>{page}</AuthLayout>
)

export default SigninPage