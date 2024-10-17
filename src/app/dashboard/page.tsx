"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="py-40 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg border rounded-lg border-gray-200">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-xl font-semibold">Appointments Overview</CardTitle>
            <CardDescription className="text-sm text-gray-500">Manage and review your paid appointments here.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">Easily access all the appointments you have already paid for and view their details.</p>
          </CardContent>
          <CardFooter className="bg-gray-50">
            <Button variant="default">
              <Link href="/dashboard/view-appointments">View Appointments</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg border rounded-lg border-gray-200">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-xl font-semibold">Test Purchased</CardTitle>
            <CardDescription className="text-sm text-gray-500">Access and review the tests you have purchased.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">Find and review all the tests you have purchased in one place.</p>
          </CardContent>
          <CardFooter className="bg-gray-50">
            <Button variant="default">
              <Link href="dashboard/view-tests">View Tests</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
