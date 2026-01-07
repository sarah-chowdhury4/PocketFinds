"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  Trash2,
  Download,
  Filter,
  UserPlus,
  Mail,
  Shield,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const users = [
  {
    id: "1",
    name: "Rahim Ahmed",
    email: "rahim@example.com",
    role: "student",
    status: "active",
    trustPoints: 320,
    reviews: 24,
    joined: "2024-01-15",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Fatima Khan",
    email: "fatima@example.com",
    role: "stall_owner",
    status: "active",
    trustPoints: 850,
    reviews: 0,
    joined: "2024-01-10",
    lastActive: "1 hour ago",
  },
  {
    id: "3",
    name: "Karim Hassan",
    email: "karim@example.com",
    role: "student",
    status: "suspended",
    trustPoints: 45,
    reviews: 8,
    joined: "2024-01-05",
    lastActive: "3 days ago",
  },
  {
    id: "4",
    name: "Ayesha Begum",
    email: "ayesha@example.com",
    role: "student",
    status: "active",
    trustPoints: 180,
    reviews: 12,
    joined: "2024-02-01",
    lastActive: "5 hours ago",
  },
  {
    id: "5",
    name: "Nasir Rahman",
    email: "nasir@example.com",
    role: "stall_owner",
    status: "pending",
    trustPoints: 0,
    reviews: 0,
    joined: "2024-02-10",
    lastActive: "1 day ago",
  },
  {
    id: "6",
    name: "Salma Khatun",
    email: "salma@example.com",
    role: "student",
    status: "active",
    trustPoints: 520,
    reviews: 45,
    joined: "2023-12-20",
    lastActive: "30 minutes ago",
  },
  {
    id: "7",
    name: "Abdul Karim",
    email: "abdul@example.com",
    role: "stall_owner",
    status: "active",
    trustPoints: 720,
    reviews: 0,
    joined: "2023-11-15",
    lastActive: "2 hours ago",
  },
  {
    id: "8",
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    role: "student",
    status: "active",
    trustPoints: 95,
    reviews: 6,
    joined: "2024-02-05",
    lastActive: "1 day ago",
  },
]

export default function AdminUsersPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)
  const [actionDialog, setActionDialog] = useState<"suspend" | "delete" | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleSuspend = () => {
    toast.success(
      `User ${selectedUser?.name} has been ${selectedUser?.status === "suspended" ? "unsuspended" : "suspended"}`,
    )
    setActionDialog(null)
    setSelectedUser(null)
  }

  const handleDelete = () => {
    toast.success(`User ${selectedUser?.name} has been deleted`)
    setActionDialog(null)
    setSelectedUser(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden lg:block">
        <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      </div>

      <main className={cn("transition-all duration-300", sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64")}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
              <p className="text-muted-foreground mt-1">Manage all registered users on the platform</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="stall_owner">Stall Owners</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>All Users ({filteredUsers.length})</CardTitle>
              <CardDescription>A list of all users registered on PocketFinds</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trust Points</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === "stall_owner" ? "default" : "secondary"}>
                          {user.role === "stall_owner" ? "Stall Owner" : "Student"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "active"
                              ? "default"
                              : user.status === "suspended"
                                ? "destructive"
                                : "secondary"
                          }
                          className={cn(user.status === "active" && "bg-success text-success-foreground")}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4 text-primary" />
                          <span>{user.trustPoints}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.reviews}</TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user)
                                setActionDialog("suspend")
                              }}
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              {user.status === "suspended" ? "Unsuspend" : "Suspend"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                setSelectedUser(user)
                                setActionDialog("delete")
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Suspend Dialog */}
      <Dialog open={actionDialog === "suspend"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-warning" />
              {selectedUser?.status === "suspended" ? "Unsuspend User" : "Suspend User"}
            </DialogTitle>
            <DialogDescription>
              {selectedUser?.status === "suspended"
                ? `Are you sure you want to unsuspend ${selectedUser?.name}? They will regain access to the platform.`
                : `Are you sure you want to suspend ${selectedUser?.name}? They will lose access to the platform.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)} className="bg-transparent">
              Cancel
            </Button>
            <Button variant={selectedUser?.status === "suspended" ? "default" : "destructive"} onClick={handleSuspend}>
              {selectedUser?.status === "suspended" ? "Unsuspend" : "Suspend"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={actionDialog === "delete"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete User
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone and all their data will
              be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)} className="bg-transparent">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
