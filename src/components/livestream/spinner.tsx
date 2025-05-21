"use client";

import { Flex } from "@radix-ui/themes";

export const Spinner = () => {
  return (
      <Flex className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full" />
  );
};