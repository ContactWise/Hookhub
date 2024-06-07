import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { FC } from "react";

interface RegistryCardDetails {
  evenCount: number;
  registryName: string;
  description: string;
}

interface RegistryCardProps {
  registryCard: RegistryCardDetails;
}

const RegistryCard: FC<RegistryCardProps> = ({ registryCard }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{registryCard.registryName}</CardTitle>
        <CardDescription className=" line-clamp-2 ">
          {registryCard.description}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Badge className=" p-1 sm:p-2" variant="secondary">
          Event Count: {registryCard.evenCount}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default RegistryCard;
