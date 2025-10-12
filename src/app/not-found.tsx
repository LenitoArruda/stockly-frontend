'use client';
import { Box, Button, Text } from '@radix-ui/themes';
import Image from 'next/image';

export default function NotFound() {
  const handleButtonClick = () => {
    window.location.href = '/';
  };

  return (
    <Box className="flex flex-col items-center justify-center h-[80vh] gap-[30px]">
      <Box className="flex flex-col md:flex-row items-center justify-center gap-[10px] md:gap-[50px]">
        <Image
          src="/not-found.svg"
          alt="Not Found"
          width={0}
          height={0}
          className="w-[200px] h-[200px] md:w-[300px] md:h-[400px] lg:w-[400px] lg:h-[400px]"
        />

        <Box className="flex flex-col max-w-[450px] gap-[20px]">
          <Text className="text-[25px] lg:text-[32px] font-bold text-[#2F8EF4]">
            We looked everywhere but couldn&apos;t find that page.
          </Text>

          <Text className="text-[16px] lg:text-[20px] text-gray-600">
            It might have been moved or deleted. Try going back to the homepage.
          </Text>
        </Box>
      </Box>

      <Button
        size="3"
        className="border border-blue-500 bg-blue-500 hover:bg-[#2773e5] text-white transition-colors cursor-pointer rounded-md p-2"
        onClick={handleButtonClick}
      >
        Go Back Home
      </Button>
    </Box>
  );
}
