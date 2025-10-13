import { Box } from '@radix-ui/themes';
import { LoginForm } from './LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <Box className="flex flex-1 items-center justify-center">
      <Box className="flex p-10 border shadow-lg rounded-xl h-100 w-80 md:w-160 bg-gradient-to-r from-blue-300 via-blue-100 to-blue-10">
        <Box className="w-80 items-center justify-center hidden md:flex">
          <Image src="/login.svg" alt="Stockly Logo" width={300} height={300} />
        </Box>
        <Box className="w-full">
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
}
