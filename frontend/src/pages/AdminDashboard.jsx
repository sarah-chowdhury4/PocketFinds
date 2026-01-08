import { useState, useEffect } from "react"
import { DashboardSidebar } from "../components/dashboard/sidebar"
import { useAuth } from "../lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { 
  Users, 
  Store, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Ban,
  X,
  Mail,
  Phone,
  Calendar,
  Shield
} from "lucide-react"
import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export default function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [pendingOwners, setPendingOwners] = useState([])
  const [verifiedOwners, setVerifiedOwners] = useState([])
  const [reportedStalls, setReportedStalls] = useState([])
  const [selectedOwner, setSelectedOwner] = useState(null)
  const [showOwnerModal, setShowOwnerModal] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      const [ownersRes, verifiedRes, reportsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/dashboard/admin/stall-owners/pending`, { headers }),
        axios.get(`${API_BASE_URL}/api/dashboard/admin/stall-owners/verified`, { headers }),
        axios.get(`${API_BASE_URL}/api/dashboard/admin/stalls/reported`, { headers })
      ])

      setPendingOwners(ownersRes.data.stall_owners || [])
      setVerifiedOwners(verifiedRes.data.stall_owners || [])
      setReportedStalls(reportsRes.data.reportedStalls || [])
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleViewOwner = (owner) => {
    setSelectedOwner(owner)
    setShowOwnerModal(true)
  }

  const handleVerifyOwner = async (ownerId) => {
    setActionLoading(true)
    setError("")
    setSuccess("")

    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `${API_BASE_URL}/api/dashboard/admin/stall-owners/${ownerId}/verify`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setSuccess("Stall owner verified successfully!")
      const owner = pendingOwners.find(o => o._id === ownerId)
      setPendingOwners(pendingOwners.filter(o => o._id !== ownerId))
      setVerifiedOwners([...verifiedOwners, owner])
      setShowOwnerModal(false)
      setSelectedOwner(null)
    } catch (err) {
      setError(err.response?.data?.error || "Failed to verify owner")
    } finally {
      setActionLoading(false)
    }
  }

  const handleRevokeVerification = async (ownerId) => {
    if (!window.confirm('Are you sure you want to revoke this stall owner\'s verification?')) {
      return
    }

    setActionLoading(true)
    setError("")
    setSuccess("")

    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `${API_BASE_URL}/api/dashboard/admin/stall-owners/${ownerId}/revoke`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setSuccess("Stall owner verification revoked successfully!")
      const owner = verifiedOwners.find(o => o._id === ownerId)
      setVerifiedOwners(verifiedOwners.filter(o => o._id !== ownerId))
      setPendingOwners([...pendingOwners, owner])
      setShowOwnerModal(false)
      setSelectedOwner(null)
    } catch (err) {
      setError(err.response?.data?.error || "Failed to revoke verification")
    } finally {
      setActionLoading(false)
    }
  }

  const handleBanStall = async (stallId, stallName) => {
    if (!window.confirm(`Are you sure you want to ban "${stallName}"? This will hide it from the website.`)) {
      return
    }

    setActionLoading(true)
    setError("")
    setSuccess("")

    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `${API_BASE_URL}/api/dashboard/admin/stalls/${stallId}/ban`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setSuccess(`"${stallName}" has been banned successfully!`)
      setReportedStalls(reportedStalls.filter(s => s._id !== stallId))
    } catch (err) {
      setError(err.response?.data?.error || "Failed to ban stall")
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

      <main className={sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage stall owners and reported content</p>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                <Users className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingOwners.length}</div>
                <p className="text-xs text-muted-foreground">Stall owners awaiting approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reported Stalls</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportedStalls.length}</div>
                <p className="text-xs text-muted-foreground">Stalls with pending reports</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admin Status</CardTitle>
                <Shield className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Active</div>
                <p className="text-xs text-muted-foreground">Logged in as {user?.email}</p>
              </CardContent>
            </Card>
          </div>

          {/* Success/Error Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              {success}
            </div>
          )}

          {/* Unverified Owners Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-500" />
                Unverified Stall Owners ({pendingOwners.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingOwners.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                  <p>No pending verifications</p>
                  <p className="text-sm">All stall owners have been verified</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pendingOwners.map((owner) => (
                    <div 
                      key={owner._id} 
                      className="border border-yellow-300 dark:border-yellow-600 rounded-lg p-4 bg-yellow-100 dark:bg-yellow-900/50 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {owner.first_name} {owner.last_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{owner.email}</p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 text-xs rounded-full">
                          Pending
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        Registered: {new Date(owner.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewOwner(owner)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Info
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleVerifyOwner(owner._id)}
                          disabled={actionLoading}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verified Stall Owners Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Verified Stall Owners ({verifiedOwners.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {verifiedOwners.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2 text-blue-400" />
                  <p>No verified stall owners yet</p>
                  <p className="text-sm">Approve pending owners to see them here</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {verifiedOwners.map((owner) => (
                    <div 
                      key={owner._id} 
                      className="border border-green-300 dark:border-green-600 rounded-lg p-4 bg-green-100 dark:bg-green-900/50 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {owner.first_name} {owner.last_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{owner.email}</p>
                        </div>
                        <span className="px-2 py-1 bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100 text-xs rounded-full">
                          Verified
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        Verified: {new Date(owner.verified_at || owner.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedOwner(owner)
                            setShowOwnerModal(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Info
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRevokeVerification(owner._id)}
                          disabled={actionLoading}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reported Stalls Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Reported Stalls ({reportedStalls.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reportedStalls.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                  <p>No reported stalls</p>
                  <p className="text-sm">All stalls are in good standing</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reportedStalls.map((stall) => (
                    <div 
                      key={stall._id} 
                      className="border rounded-lg p-4 bg-red-50/30 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          {/* Stall Image */}
                          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                            {stall.stall_image ? (
                              <img 
                                src={`${API_BASE_URL}${stall.stall_image}`} 
                                alt={stall.stall_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Store className="h-8 w-8 text-muted-foreground" />
                            )}
                          </div>

                          {/* Stall Info */}
                          <div>
                            <h3 className="font-semibold text-lg">{stall.stall_name}</h3>
                            <p className="text-sm text-muted-foreground">{stall.stall_location}</p>
                            {stall.owner && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Owner: {stall.owner.first_name} {stall.owner.last_name}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Report Count Badge */}
                        <div className="flex flex-col items-end gap-2">
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" />
                            {stall.report_count} {stall.report_count === 1 ? 'Report' : 'Reports'}
                          </span>
                          <Button 
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBanStall(stall._id, stall.stall_name)}
                            disabled={actionLoading}
                          >
                            <Ban className="h-4 w-4 mr-1" />
                            Ban Stall
                          </Button>
                        </div>
                      </div>

                      {/* Report Reasons */}
                      {stall.reports && stall.reports.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium mb-2">Report Reasons:</p>
                          <div className="flex flex-wrap gap-2">
                            {[...new Set(stall.reports.map(r => r.reason))].map((reason, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded capitalize"
                              >
                                {reason}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Owner Info Modal */}
      {showOwnerModal && selectedOwner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Stall Owner Details</h2>
                <button 
                  onClick={() => { setShowOwnerModal(false); setSelectedOwner(null); }}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {selectedOwner.first_name?.charAt(0)}{selectedOwner.last_name?.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Name */}
              <div className="text-center">
                <h3 className="text-xl font-semibold">
                  {selectedOwner.first_name} {selectedOwner.last_name}
                </h3>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  selectedOwner.verified_status 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {selectedOwner.verified_status ? 'Verified' : 'Pending Verification'}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedOwner.email}</p>
                  </div>
                </div>

                {selectedOwner.phone && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedOwner.phone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Registered</p>
                    <p className="font-medium">
                      {new Date(selectedOwner.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t p-4 flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => { setShowOwnerModal(false); setSelectedOwner(null); }}
              >
                Cancel
              </Button>
              {selectedOwner.verified_status ? (
                <Button 
                  className="flex-1"
                  variant="destructive"
                  onClick={() => handleRevokeVerification(selectedOwner._id)}
                  disabled={actionLoading}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  {actionLoading ? 'Revoking...' : 'Revoke Verification'}
                </Button>
              ) : (
                <Button 
                  className="flex-1"
                  onClick={() => handleVerifyOwner(selectedOwner._id)}
                  disabled={actionLoading}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {actionLoading ? 'Verifying...' : 'Verify Owner'}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
