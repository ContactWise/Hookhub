import PaginatedTable from "@/components/custom/paginatedTable";
import Typography from "@/components/custom/typography";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const payloadData = `{
  "message": "Hello, World!",
  "user": "John Doe"
  "time": "4th July 2024 @ 5:40pm (GMT+5:30)"
  "status": "success"
  "id": "550e8400-e29b-41d4-a716-4466554"
  "applicationId": "550e8400-e29b-41d4-a716-4466554"
  "createdAt": "4th July 2024 @ 5:40pm (GMT+5:30)"
  "updatedAt": "4th July 2024 @ 5:40pm (GMT+5:30)"
  "deletedAt": null
  "deleted": false
  "version": 1
  "type": "email"
  "subject": "Hello, World!"
  "from": "John Doe"
  "to": "Jane Doe"
  "cc": "John Doe"
  "bcc": "John Doe"
  "attachments": []
  "template": "Hello, World!"
  "metadata": {}
  "tags": []
  }
  `;

const COLUMNS = [
  {
    name: "attempt",
    label: "Attempt #",
  },
  {
    name: "url",
    label: "Url",
  },
  {
    name: "statuscode",
    label: "Status",
  },
  {
    name: "processedAt",
    label: "Processed At",
  },
  {
    name: "status",
    label: "Status",
  },
];

const DATA = [
  {
    attempt: 1,
    url: "https://example.com/1",
    statuscode: 200,
    processedAt: "4th July 2024 @ 5:40pm (GMT+5:30)",
    status: "success",
  },
  {
    attempt: 2,
    url: "https://example.com/2",
    statuscode: 200,
    processedAt: "4th July 2024 @ 5:40pm (GMT+5:30)",
    status: "success",
  },
  {
    attempt: 3,
    url: "https://example.com/3",
    statuscode: 200,
    processedAt: "4th July 2024 @ 5:40pm (GMT+5:30)",
    status: "success",
  },
  {
    attempt: 4,
    url: "https://example.com/4",
    statuscode: 200,
    processedAt: "4th July 2024 @ 5:40pm (GMT+5:30)",
    status: "success",
  },
  {
    attempt: 5,
    url: "https://example.com/5",
    statuscode: 200,
    processedAt: "4th July 2024 @ 5:40pm (GMT+5:30)",
    status: "success",
  },
];

const CredentialsPage = () => {
  return (
    <>
      <h2 className="scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight mb-1"></h2>
      <Typography variant={"pageTitle"}>
        Message ID: 550e8400-e29b-41d4-a716-4466554
      </Typography>
      <ScrollArea className="flex flex-1 p-2 justify-center rounded-lg border border-dashed shadow-sm ">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col w-full space-y-8">
            <div className="grid grid-cols-3 md:grid-cols-6 grid-flow-row-dense">
              <div className="grid gap-3 font-semibold  col-span-1">
                <Typography variant={"formFieldTitle"}>Url</Typography>
                <Typography variant={"formFieldTitle"}>Recieved At</Typography>
                <Typography variant={"formFieldTitle"}>Status</Typography>
              </div>
              <div className="grid auto-rows-max gap-3 col-span-2 md:col-span-4">
                <div>
                  <code className="bg-muted px-[0.3rem] py-[0.2rem] font-mono">
                    550e8400-e29b-41d4-a716-4466554
                  </code>
                </div>
                <div>
                  {" "}
                  <code className="bg-muted px-[0.3rem] py-[0.2rem] font-mono">
                    4th July 2024 @ 5:40pm (GMT+5:30)
                  </code>
                </div>
                <div>
                  <Badge variant={"success"}>Delivered</Badge>
                </div>
              </div>
            </div>
            <div>
              <Typography variant={"formFieldTitle"}>Payload</Typography>
              <ScrollArea className="h-72">
                <div className="bg-muted text-sm font-mono  p-2 rounded-lg h-full">
                  <pre className="p-2">{payloadData}</pre>
                </div>
              </ScrollArea>
            </div>

            <PaginatedTable
              tableHead={
                <Typography variant="formFieldTitle">
                  Message Activity
                </Typography>
              }
              columns={COLUMNS}
              data={DATA}
            />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default CredentialsPage;
