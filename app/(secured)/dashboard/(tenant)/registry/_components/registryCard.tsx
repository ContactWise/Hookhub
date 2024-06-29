import Typography from "@/components/custom/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventRegistryResource } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface RegistryCardProps {
  registry: EventRegistryResource;
}

const RegistryCard: FC<RegistryCardProps> = ({ registry }) => {
  return (
    <Card>
      <CardHeader>
        <Link href={`/dashboard/registry/${registry.id}`}>
          <Typography className="text-primary underline" variant={"cardTitle"}>
            {registry.name}
          </Typography>
        </Link>
        <Typography variant="cardDescription" className="line-clamp-2">
          {registry.description}
        </Typography>
      </CardHeader>
      <CardContent>
        <Badge className=" p-1 sm:p-2" variant="secondary">
          Event Count: {registry.eventTypes.length}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default RegistryCard;
