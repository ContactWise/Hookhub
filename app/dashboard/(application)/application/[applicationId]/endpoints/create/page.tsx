import { ScrollArea } from "@/components/ui/scroll-area";
import CreateEndpointForm from "./_components/createEndpointForm";
import Typography from "@/components/custom/typography";

const CreateEndpointPage = () => {
  return (
    <>
      <Typography variant={"pageTitle"}>Create New Endpoint</Typography>
      <ScrollArea className="flex flex-1 p-2 justify-center rounded-lg border border-dashed shadow-sm ">
        <CreateEndpointForm />
      </ScrollArea>
    </>
  );
};

export default CreateEndpointPage;
