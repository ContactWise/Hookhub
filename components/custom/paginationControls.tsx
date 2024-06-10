"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationControlsProps {
  page: number;
  limit: number;
}

const PaginationControls: FC = () => {
  const pathName = usePathname();
  const sParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const page = sParams.get("_page");
    const limit = sParams.get("_page_size");
    if (page && limit) {
      console.log(pathName);
      setPage(Number(page));
      setLimit(Number(limit));
    }
  }, [sParams]);
  const handleNext = () => {
    const url = pathName + `?_page=${page + 1}&_page_size=${limit}`;
    router.push(url);
  };

  const handlePrev = () => {
    const url = pathName + `?_page=${page - 1}&_page_size=${limit}`;
    router.push(url);
  };

  return (
    <div className="flex gap-1">
      <Button
        disabled={!(page || limit) || page < 2}
        onClick={handlePrev}
        variant="outline"
        size="icon"
      >
        <ChevronLeft />
      </Button>
      <Button
        disabled={!(page || limit)}
        onClick={handleNext}
        variant="outline"
        size="icon"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default PaginationControls;
