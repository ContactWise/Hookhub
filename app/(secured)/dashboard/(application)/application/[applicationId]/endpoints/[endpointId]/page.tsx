"use client";

import InputForm from "@/components/formInput";
import { Link } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import EditEndpointForm from "./_components/editEndpointForm";
import Typography from "@/components/custom/typography";
import { ScrollArea } from "@/components/ui/scroll-area";

const SingleEndpointPage = () => {
  return (
    // <div className="flex flex-col items-center w-full">
    // <div className="flex flex-col w-full">
    <>
      {/* <h2 className="scroll-m-20  pb-4 text-xl md:text-2xl font-semibold tracking-tight mb-1">
           Endpoint ID: 550e8400-e29b-41d4-a716-4466554
        </h2> */}
      <Typography variant={"pageTitle"}>
        Endpoint ID: 550e8400-e29b-41d4-a716-4466554
      </Typography>
      {/* <div className="py-4"> */}
      <ScrollArea className="flex flex-1 p-2 justify-center rounded-lg border border-dashed shadow-sm ">
        <EditEndpointForm />
      </ScrollArea>
    </>

    // </div>
    // </div>
    // </div>
  );
};

export default SingleEndpointPage;
