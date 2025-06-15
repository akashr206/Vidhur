"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Clock,
  CheckCircle,
  Play,
  MoreVertical,
  Filter,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Tests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const testData = [
    {
      id: 1,
      title: "JEE MAINS - Physics Mock Test 1",
      subject: "Physics",
      questions: 30,
      duration: "90 min",
      difficulty: "Intermediate",
      status: "completed",
      score: 85,
      date: "2024-01-15",
      attempts: 2,
    },
    {
      id: 2,
      title: "Organic Chemistry - Chapter 5 Quiz",
      subject: "Chemistry",
      questions: 20,
      duration: "45 min",
      difficulty: "Beginner",
      status: "pending",
      score: null,
      date: "2024-01-20",
      attempts: 0,
    },
    {
      id: 3,
      title: "Calculus Integration Practice",
      subject: "Mathematics",
      questions: 25,
      duration: "60 min",
      difficulty: "Veteran",
      status: "in-progress",
      score: null,
      date: "2024-01-18",
      attempts: 1,
    },
    {
      id: 4,
      title: "JEE ADVANCED - Mixed Topics",
      subject: "Mixed",
      questions: 50,
      duration: "120 min",
      difficulty: "Veteran",
      status: "completed",
      score: 92,
      date: "2024-01-12",
      attempts: 1,
    },
  ];

  const stats = [
    {
      title: "Total Tests",
      value: "24",
      change: "+3 this week",
      icon: Target,
    },
    {
      title: "Average Score",
      value: "87%",
      change: "+5% from last month",
      icon: TrendingUp,
    },
    {
      title: "Completed",
      value: "18",
      change: "6 pending",
      icon: CheckCircle,
    },
    {
      title: "Study Time",
      value: "45h",
      change: "This month",
      icon: Clock,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-blue-100 text-blue-800";
      case "Intermediate":
        return "bg-orange-100 text-orange-800";
      case "Veteran":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateTest = () => {
    console.log("Creating new test...");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex-1 space-y-6 w-[calc(100vw-320px)] p-6 mx-auto">
      {/* Header */}
      <div className="px-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Vidhur</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/page">Tests</BreadcrumbLink>
           
              <BreadcrumbPage></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tests & Quizzes</h1>
          <p className="text-gray-600 mt-1">Track your progress and test your knowledge</p>
        </div>
        <Button 
          className="bg-black hover:bg-gray-800 text-white"
          onClick={handleCreateTest}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Test
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search tests..." 
            className="pl-10" 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Date Range
        </Button>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testData.map((test) => (
          <Card key={test.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">{test.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {test.subject}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(test.difficulty)}`}>{test.difficulty}</Badge>
                    <Badge className={`text-xs ${getStatusColor(test.status)}`}>{test.status.replace("-", " ")}</Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Test</DropdownMenuItem>
                    <DropdownMenuItem>View Results</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-blue-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>{test.questions} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{test.duration}</span>
                </div>
              </div>

              {test.status === "completed" && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">Score: {test.score}%</span>
                    <span className="text-xs text-green-600">Attempts: {test.attempts}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-500">Created: {new Date(test.date).toLocaleDateString()}</span>
                <Button
                  size="sm"
                  className={
                    test.status === "completed"
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-black hover:bg-gray-800 text-white"
                  }
                >
                  {test.status === "completed" ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Review
                    </>
                  ) : test.status === "in-progress" ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Continue
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Test
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-6">
        <Button variant="outline" className="px-8">
          Load More Tests
        </Button>
      </div>
    </div>
  );
}

export default Tests;