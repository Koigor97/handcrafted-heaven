import { ShoppingBasket } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ItemsSoldCard() {
  return (
    <Card className="bg-secondary1-200/50">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl flex justify-between">
          <span>Items Sold</span>
          <ShoppingBasket size={30} className="bg-primary p-1 rounded" />
        </CardTitle>
        <CardDescription>
          The total items products sold from January - October 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="text-center">
          <h2 className="text-3xl font-bold">50</h2>
        </div>
      </CardContent>
    </Card>
  );
}
