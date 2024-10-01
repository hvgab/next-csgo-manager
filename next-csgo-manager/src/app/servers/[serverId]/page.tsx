import ServerCard from "../components/ServerCard";
import RconComponent from "../components/RconComponent";
import { prisma } from "../../../lib/database";
import {
  getServerInfo,
  getServerPlayerInfo,
  getServerQuery,
  localGet,
} from "@/lib/local_api";
import { mapNameToWorkshopId } from "@/app/servers/utils";
import ServerDbCard from "../components/ServerDbCard";
import ServerQueryCard from "../components/ServerQueryCard";
import ServerQueryJson from "@/app/servers/components/ServerQueryJson";
import PublishedFileDetails from "@/components/steam/PublishedFileDetails";
// import ServerPublishedFileDetails from "@/app/components/steam/ServerPublishedFileDetails";
import ServerPublishedFileDetails from "@/components/servers/ServerPublishedFileDetails";
import useSWR from "swr";
import ServerName from "@/components/servers/ServerName";
import { Server } from "@prisma/client";
import { getServer } from "@/lib/db_queries";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  File,
  Home,
  LineChart,
  ListFilter,
  Mail,
  Map,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShieldCheck,
  ShieldX,
  ShoppingCart,
  Truck,
  Users,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Indicatior from "@/components/ui/Indicator";
import ServerInfoJsonCard from "../components/ServerInfoJsonCard";
import { Suspense } from "react";
import { Menubar } from "@/components/ui/menubar";
import ServerPlayerInfoJsonCard from "../components/server-players-json-card";
import ServerAdminMapsComponent from "../components/MapsComponent";
import { SiDiscord, SiSteam } from "@icons-pack/react-simple-icons";
import { ServerPlayerCountChart } from "../components/ServerPlayerCountChart";
import { ServerPlayerCountRadarChart } from "../components/ServerPlayerCountRadarChart";

// import { ServerPlayerInfoJsonCard } from "../components/server-players-json-card";

// PAGE
export default async function ServerDetail({
  params: { serverId },
}: {
  params: { serverId: string };
}) {
  console.log("serverId: ", serverId);
  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      owner: true,
      admins: true,
    },
  });

  if (!server) return <></>;

  const info = await getServerInfo(serverId);

  const players = await getServerPlayerInfo(serverId);
  console.log(players);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 ">
          {/* Page Header */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/servers">Servers</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{info.info.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {/* Page Content */}
          <div className="flex items-center gap-4 p-4 sm:px-6 ">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {info.info.name}
            </h1>
            <Button asChild variant={"ghost"} size={"sm"}>
              <Link href={`steam://connect/${server?.host}:${server?.port}`}>
                Connect
              </Link>
            </Button>
          </div>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            {/* Col Main */}

            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              {/* Mini Status Boxes */}
              <div className="grid auto-rows-1 items-start gap-2 sm:grid-cols-5 grid-cols-3">
                {/* Status */}
                <Card className="p-2">
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm">Status</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center text-muted-foreground">
                      <span className="flex w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                      <span>Online</span>
                    </div>
                  </CardContent>
                </Card>
                {/* Players */}
                <Card className="p-2">
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm">
                      <a href={`/servers/${server.id}/players`}>Players</a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center text-muted-foreground">
                      <Users width={16} height={16} className="mr-1" />
                      <span>
                        {info.info.players.online}/{info.info.players.max}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                {/* Map */}
                <Card className="p-2">
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm">Map</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center text-muted-foreground">
                      <Map className="h-4" />
                      <span>{info.info.map}</span>
                    </div>
                  </CardContent>
                </Card>
                {/* Visibility */}
                <Card className="p-2">
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm">Visibility</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center text-muted-foreground">
                      {info.info.visibility == "public" ? (
                        <>
                          <Eye className="text-green-500 h-4" /> Public
                        </>
                      ) : (
                        <>
                          <EyeOff className="text-red-500 h-4" /> Private
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
                {/* VAC */}
                <Card className="p-2">
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm">VAC</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center text-muted-foreground">
                      {info.info.VAC == true ? (
                        <>
                          <ShieldCheck className="text-green-500 h-4" /> Secure
                        </>
                      ) : (
                        <>
                          <ShieldX className="text-red-500 h-4" /> Unsecure
                        </>
                      )}

                      {/* <span className="text-xs">
                        {JSON.stringify(info.info, null, 2)}
                      </span> */}
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* RCON */}
              <div className="grid gap-4">
                <Card>
                  <CardHeader className="bg-muted/50">
                    <CardTitle>
                      <a href={`/servers/${server.id}/rcon`}></a>
                      RCON
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-4">
                    <pre>$ status</pre>
                    <pre>&gt; running</pre>
                    <div className="mt-4 flex items-baseline gap-2">
                      <Input className=""></Input>
                      <Button>Submit</Button>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <Button variant={"outline"}>Status</Button>
                      <Button variant={"secondary"}>Get5 Status</Button>
                    </div>
                  </CardContent>
                  {/* <CardFooter></CardFooter> */}
                </Card>
              </div>
              {/* Maps */}
              <div className="grid grid-cols-1">
                <Card>
                  <CardHeader className="bg-muted/50">
                    <CardTitle>Maps</CardTitle>
                  </CardHeader>
                  <CardContent className="py-4">
                    <ServerAdminMapsComponent></ServerAdminMapsComponent>
                  </CardContent>
                  {/* <CardFooter></CardFooter> */}
                </Card>
              </div>
              {/* Matches */}
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                  <CardHeader className="pb-3">
                    <CardTitle>Matches</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Introducing Our Dynamic Orders Dashboard for Seamless
                      Management and Insightful Analysis.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button>Create New Match</Button>
                  </CardFooter>
                </Card>
                {/* <Card x-chunk="dashboard-05-chunk-1">
                  <CardHeader className="pb-2">
                    <CardDescription>This Week</CardDescription>
                    <CardTitle className="text-4xl">$1,329</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      +25% from last week
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                  </CardFooter>
                </Card> */}
                <ServerPlayerCountRadarChart></ServerPlayerCountRadarChart>
                {/* <Card x-chunk="dashboard-05-chunk-2">
                  <CardHeader className="pb-2">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle className="text-4xl">$5,329</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      +10% from last month
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={12} aria-label="12% increase" />
                  </CardFooter>
                </Card> */}
                <ServerPlayerCountChart></ServerPlayerCountChart>
              </div>
              {/* <ServerPlayerCountChart></ServerPlayerCountChart> */}
              {/* <ServerPlayerCountRadarChart></ServerPlayerCountRadarChart> */}
              {/* Week */}
              <Tabs defaultValue="week">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Fulfilled
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Declined
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Refunded
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <File className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                  </div>
                </div>
                <TabsContent value="week">
                  <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                      <CardTitle>Orders</CardTitle>
                      <CardDescription>
                        Recent orders from your store.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Type
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Date
                            </TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="bg-accent">
                            <TableCell>
                              <div className="font-medium">Liam Johnson</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Sale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Fulfilled
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-23
                            </TableCell>
                            <TableCell className="text-right">
                              $250.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Olivia Smith</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                olivia@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Refund
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="outline">
                                Declined
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-24
                            </TableCell>
                            <TableCell className="text-right">
                              $150.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Noah Williams</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                noah@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Subscription
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Fulfilled
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-25
                            </TableCell>
                            <TableCell className="text-right">
                              $350.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Emma Brown</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                emma@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Sale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Fulfilled
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-26
                            </TableCell>
                            <TableCell className="text-right">
                              $450.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Liam Johnson</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Sale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Fulfilled
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-23
                            </TableCell>
                            <TableCell className="text-right">
                              $250.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Liam Johnson</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Sale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Fulfilled
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-23
                            </TableCell>
                            <TableCell className="text-right">
                              $250.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Olivia Smith</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                olivia@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Refund
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="outline">
                                Declined
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-24
                            </TableCell>
                            <TableCell className="text-right">
                              $150.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Emma Brown</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                emma@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Sale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                Fulfilled
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-06-26
                            </TableCell>
                            <TableCell className="text-right">
                              $450.00
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              {/* Players Card */}
              <Card className="overflow-hidden mb-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Players
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy Order ID</span>
                      </Button>
                    </CardTitle>
                    <CardDescription>Date: November 23, 2023</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                      <Truck className="h-3.5 w-3.5" />
                      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                        Track Order
                      </span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Trash</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Players Online</div>
                    <ul className="grid gap-3">
                      {players &&
                        players &&
                        players.map((player) => (
                          <li
                            key={player.index}
                            className="flex items-center justify-between"
                          >
                            <span>{player.name || "bot"}</span>
                            <span className="text-muted-foreground">
                              {player.score}
                            </span>
                            <span className="text-muted-foreground">
                              {player.timeOnline.hours}h
                              {player.timeOnline.minutes}m
                              {player.timeOnline.seconds}s
                            </span>
                            <div>
                              <Button size={"sm"}>Kick</Button>
                              <Button variant={"destructive"} size={"sm"}>
                                Ban
                              </Button>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-3">
                    <div className="font-semibold">Players Offline</div>
                    <ul className="grid gap-3">
                      {players &&
                        players.map((player) => (
                          <li
                            key={player.index}
                            className="flex items-center justify-between"
                          >
                            <span>{player.name || "bot"}</span>
                            <span className="text-muted-foreground">
                              {player.score}
                            </span>
                            <span className="text-muted-foreground">
                              {player.timeOnline.hours}h
                              {player.timeOnline.minutes}m
                              {player.timeOnline.seconds}s
                            </span>
                            <div>
                              <Button size={"sm"}>Kick</Button>
                              <Button variant={"destructive"} size={"sm"}>
                                Ban
                              </Button>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-3">
                    <div className="font-semibold">Players Banned</div>
                    <ul className="grid gap-3">
                      {players.map((player) => (
                        <li
                          key={player.index}
                          className="flex items-center justify-between"
                        >
                          <span>{player.name || "bot"}</span>
                          <span className="text-muted-foreground">
                            {player.score}
                          </span>
                          <span className="text-muted-foreground">
                            {player.timeOnline.hours}h
                            {player.timeOnline.minutes}m
                            {player.timeOnline.seconds}s
                          </span>
                          <div>
                            <Button size={"sm"}>Kick</Button>
                            <Button variant={"destructive"} size={"sm"}>
                              Ban
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                  </div>
                  <Pagination className="ml-auto mr-0 w-auto">
                    <PaginationContent>
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                          <span className="sr-only">Previous Order</span>
                        </Button>
                      </PaginationItem>
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                          <span className="sr-only">Next Order</span>
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>
              {/* Admins Card */}
              <Card className="overflow-hidden mb-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Admins
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy Order ID</span>
                      </Button>
                    </CardTitle>
                    <CardDescription>Date: November 23, 2023</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Trash</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Owner</div>

                    <dl key={server.owner.id} className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Name</dt>
                        <dd>{server.owner.name}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>
                          <a href="mailto:">{server.owner.email}</a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Discord</dt>
                        <dd>
                          <a href="#">@Gabbeh#1234</a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Steam</dt>
                        <dd>
                          <a href="#">steamprofile/Gabbeh</a>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Admins */}
                  <div className="grid gap-3 mt-6">
                    <div className="font-semibold">Admins</div>

                    {server?.admins.map((admin) => (
                      <dl
                        key={admin.id}
                        className="grid gap-3 pb-4 last:pb-0 border-b-2 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            <span className="w-4 h-4"></span>
                            User
                          </dt>
                          <dd>
                            <a href={`/profile/${admin.id}`}>{admin.name}</a>
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            <SiDiscord className="text-muted-foreground h-4 w-4" />{" "}
                            Discord
                          </dt>
                          <dd>
                            <a href="#">@Gabbeh#1234</a>
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            <SiSteam className="text-muted-foreground h-4 w-4" />
                            Steam
                          </dt>
                          <dd>
                            <a href="#">steamprofile/Gabbeh</a>
                          </dd>
                        </div>
                      </dl>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                  </div>
                  <Pagination className="ml-auto mr-0 w-auto">
                    <PaginationContent>
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                          <span className="sr-only">Previous Order</span>
                        </Button>
                      </PaginationItem>
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                          <span className="sr-only">Next Order</span>
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>
            </div>
          </main>
          <div className="grid flex-1 gap-4 grid-cols-3 p-4 sm:px-6">
            <ServerInfoJsonCard serverId={serverId} />
            <ServerPlayerInfoJsonCard serverId={serverId} />
          </div>
        </div>
      </div>
    </>
  );
}
