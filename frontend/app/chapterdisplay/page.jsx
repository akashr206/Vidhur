import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Trash2} from "lucide-react"
import { Button } from "@/components/ui/button";

const data = [
  { title: "title", description: "description" },
  { title: "title", description: "description" },
  { title: "title", description: "description" },
  { title: "title", description: "description" },
  { title: "title", description: "description" },
  { title: "title", description: "description" },
];
const dataitems = data.map((d,i) => (
  <Card key={i} className="w-85 h-50">
    <div className="flex justify-between pr-2">
      <div>
        <CardHeader className="text-2xl font-bold">{d.title}</CardHeader>
      </div>
      <div>
        <Button variant="ghost" className="cursor-pointer hover:text-red-500"><Trash2></Trash2></Button>
      </div>
    </div>
    <CardDescription className="px-5 text-md">{d.description}</CardDescription>
  </Card>
));

const page = () => {
  return (
    <div className="p-20 gap-3 flex flex-wrap justify-evenly">{dataitems}</div>
  );
};

export default page;
