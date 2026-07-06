import React from 'react';
import type { UseFormRegister, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import type { LoginPayload } from '@/services/auth.service';

interface LoginFormProps {
  register: UseFormRegister<LoginPayload>;
  handleSubmit: UseFormHandleSubmit<LoginPayload>;
  errors: FieldErrors<LoginPayload>;
  onSubmit: (data: LoginPayload) => void;
  isFormSubmitting: boolean;
  navigate: (path: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  isFormSubmitting,
  navigate,
}) => {
  return (
    <div className="space-y-2">
      {/* Google Login */}
      <Button
        variant="outline"
        className="border-border hover:bg-secondary/30 w-full py-6 text-[#012a4a] transition-all duration-200"
      >
        <FcGoogle className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="text-muted-foreground bg-white px-2">Or email access</span>
        </div>
      </div>

      {/* Email & Password Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium text-[#012a4a]">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="email"
              type="email"
              required
              placeholder="akash@example.com"
              {...register('email', { required: true })}
              className="focus-visible:ring-primary border-border pl-10"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500">Email address is required</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="font-medium text-[#012a4a]">
              Password
            </Label>
            <Button
              type="button"
              variant="link"
              onClick={() => navigate('/forgot-password')}
              className="text-primary px-0 text-xs font-medium hover:text-[#013a63]"
            >
              Forgot password?
            </Button>
          </div>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              {...register('password', { required: true, minLength: 6 })}
              className="focus-visible:ring-primary border-border pl-10"
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">Password is required (min 6 chars)</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isFormSubmitting}
          className="bg-primary w-full py-6 text-white shadow-md transition-all hover:bg-[#013a63] hover:shadow-lg"
        >
          {isFormSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner className="h-4 w-4" /> Signing In...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Sign In to Wellness <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      <div className="pt-2 text-center">
        <p className="text-muted-foreground text-sm">
          Don't have an account?{' '}
          <Button
            variant="link"
            onClick={() => navigate('/signup')}
            className="text-primary p-0 font-semibold hover:text-[#013a63]"
          >
            Sign up now
          </Button>
        </p>
      </div>
    </div>
  );
};
