import { DollarSign } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RevenueCard() {
  return (
    <Card className="bg-secondary1-200/50">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl flex justify-between">
          <span>Revenue</span>
          <DollarSign size={30} className="bg-primary p-1 rounded" />
        </CardTitle>
        <CardDescription>
          The total revenue made from January - October 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="text-center">
          <h2 className="text-3xl font-bold">$15,000</h2>
        </div>
      </CardContent>
    </Card>
  );
}
