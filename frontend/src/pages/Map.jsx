import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { DashboardSidebar } from "../components/dashboard/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { MapPin, Store, Navigation, Plus, Trash2, Save, X } from "lucide-react"
import { useAuth } from "../lib/auth-context"
import axios from "axios"

// Import marker images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

// BRAC University Badda Campus (Kha 224 Pragati Sarani, Merul Badda, Dhaka 1212, Bangladesh)
const BRAC_UNIVERSITY = {
  lat: 23.7808,
  lng: 90.4067
}

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

// Custom icon for BRAC University
const universityIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Custom icon for stalls
const stallIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Component to handle map clicks
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e.latlng)
      }
    },
  })
  return null
}

export default function Map() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [stalls, setStalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStall, setSelectedStall] = useState(null)
  const [myStalls, setMyStalls] = useState([])
  const [selectedMyStall, setSelectedMyStall] = useState(null)
  const [newMarkerPos, setNewMarkerPos] = useState(null)
  const [addingMarker, setAddingMarker] = useState(false)
  const [newStallName, setNewStallName] = useState("")
  const [newStallLocation, setNewStallLocation] = useState("")
  const [bracUniversity, setBracUniversity] = useState(BRAC_UNIVERSITY)
  const { user } = useAuth()

  const isAdmin = user?.role === 'admin' || user?.type === 'admin'
  const isStallOwner = user?.role === 'stall owner' || user?.type === 'stall owner'

  useEffect(() => {
    fetchStalls()
    if (isStallOwner) {
      fetchMyStalls()
    }
  }, [isStallOwner])

  const fetchMyStalls = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_BASE_URL}/api/stall/my-stalls`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMyStalls(response.data.stalls || [])
    } catch (error) {
      console.error('Failed to fetch my stalls:', error)
    }
  }

  const fetchStalls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/stall`)
      const stallsData = response.data.stalls || []
      
      // Only show stalls that have coordinates set
      const stallsWithCoords = stallsData.filter(stall => 
        stall.coordinates && stall.coordinates.lat && stall.coordinates.lng
      )
      
      setStalls(stallsWithCoords)
    } catch (error) {
      console.error('Failed to fetch stalls:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkerDragEnd = async (stallId, newPosition) => {
    if (!isAdmin) return

    try {
      const token = localStorage.getItem('token')
      await axios.patch(
        `${API_BASE_URL}/api/stall/${stallId}/coordinates`,
        { lat: newPosition.lat, lng: newPosition.lng },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchStalls()
    } catch (error) {
      console.error('Failed to update coordinates:', error)
      alert('Failed to update marker position')
      fetchStalls()
    }
  }

  const handleBracUniversityDragEnd = (newPosition) => {
    if (!isAdmin) return
    setBracUniversity({ lat: newPosition.lat, lng: newPosition.lng })
    localStorage.setItem('bracUniversity', JSON.stringify({ lat: newPosition.lat, lng: newPosition.lng }))
  }

  // Load saved BRAC University position on mount
  useEffect(() => {
    const saved = localStorage.getItem('bracUniversity')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.lat && parsed.lng) {
          setBracUniversity(parsed)
        }
      } catch (e) {
        console.log('Failed to parse saved location')
      }
    }
  }, [])

  const handleMapClick = (latlng) => {
    if (addingMarker || selectedMyStall) {
      setNewMarkerPos(latlng)
    }
  }

  const handleSaveStallLocation = async () => {
    if (!selectedMyStall || !newMarkerPos) {
      alert('Please select a stall and click on the map')
      return
    }

    try {
      const token = localStorage.getItem('token')
      await axios.patch(
        `${API_BASE_URL}/api/stall/${selectedMyStall}/coordinates`,
        { lat: newMarkerPos.lat, lng: newMarkerPos.lng },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      setSelectedMyStall(null)
      setNewMarkerPos(null)
      fetchStalls()
      fetchMyStalls()
      alert('Stall location saved successfully!')
    } catch (error) {
      console.error('Failed to save location:', error)
      alert('Failed to save stall location')
    }
  }

  const handleAddNewStall = async () => {
    if (!newMarkerPos || !newStallName || !newStallLocation) {
      alert('Please fill in all fields and click on the map')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${API_BASE_URL}/api/stall/create`,
        {
          stall_name: newStallName,
          stall_location: newStallLocation,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const newStallId = response.data._id
      await axios.patch(
        `${API_BASE_URL}/api/stall/${newStallId}/coordinates`,
        { lat: newMarkerPos.lat, lng: newMarkerPos.lng },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      setAddingMarker(false)
      setNewMarkerPos(null)
      setNewStallName("")
      setNewStallLocation("")
      fetchStalls()
      alert('Stall added successfully!')
    } catch (error) {
      console.error('Failed to add stall:', error)
      alert('Failed to add stall: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleDeleteStall = async (stallId) => {
    if (!window.confirm('Are you sure you want to delete this stall?')) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${API_BASE_URL}/api/stall/${stallId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchStalls()
      alert('Stall deleted successfully!')
    } catch (error) {
      console.error('Failed to delete stall:', error)
      alert('Failed to delete stall')
    }
  }

  const handleRemoveMarker = async (stallId) => {
    if (!window.confirm('Remove marker for this stall?')) return

    try {
      const token = localStorage.getItem('token')
      await axios.patch(
        `${API_BASE_URL}/api/stall/${stallId}/coordinates`,
        { lat: null, lng: null },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchStalls()
      alert('Marker removed successfully!')
    } catch (error) {
      console.error('Failed to remove marker:', error)
      alert('Failed to remove marker')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

      <main className={sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Stalls Map</h1>
              <p className="text-muted-foreground">
                Explore food stalls near BRAC University
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>BRAC University</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>Food Stalls ({stalls.length})</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <Card className="lg:col-span-2">
              <CardContent className="p-0">
                <MapContainer 
                  center={[bracUniversity.lat, bracUniversity.lng]} 
                  zoom={16} 
                  style={{ height: '600px', width: '100%' }}
                  className="rounded-lg"
                  key={`${bracUniversity.lat}-${bracUniversity.lng}`}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  <MapClickHandler onMapClick={(addingMarker || selectedMyStall) ? handleMapClick : null} />
                  
                  {/* BRAC University Marker */}
                  <Marker 
                    position={[bracUniversity.lat, bracUniversity.lng]}
                    icon={universityIcon}
                    draggable={isAdmin}
                    eventHandlers={{
                      dragend: (e) => {
                        const newPos = e.target.getLatLng()
                        handleBracUniversityDragEnd(newPos)
                      }
                    }}
                  >
                    <Popup>
                      <div className="text-center">
                        <strong className="text-sm">BRAC University</strong>
                        <p className="text-xs text-gray-600">Badda Campus</p>
                        {isAdmin && (
                          <p className="text-xs text-blue-600 mt-1">Drag to reposition</p>
                        )}
                      </div>
                    </Popup>
                  </Marker>

                  {/* Stall Markers */}
                  {stalls.map((stall) => (
                    <Marker
                      key={stall._id}
                      position={[stall.coordinates.lat, stall.coordinates.lng]}
                      icon={stallIcon}
                      title={stall.stall_name}
                      draggable={isAdmin}
                      eventHandlers={{
                        click: () => setSelectedStall(stall),
                        dragend: (e) => {
                          const newPos = e.target.getLatLng()
                          handleMarkerDragEnd(stall._id, newPos)
                        }
                      }}
                    >
                      <Popup>
                        <div style={{ minWidth: '180px' }}>
                          <h3 className="font-semibold text-sm mb-1">{stall.stall_name}</h3>
                          <p className="text-xs text-gray-600 mb-2">{stall.stall_location}</p>
                          {stall.offer && (
                            <p className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded mb-1">
                              {stall.offer}
                            </p>
                          )}
                          {stall.discount && (
                            <p className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded mb-2">
                              {stall.discount}% off
                            </p>
                          )}
                          {isAdmin && (
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              className="w-full mt-2"
                              onClick={() => handleRemoveMarker(stall._id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove Marker
                            </Button>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* New Marker Preview */}
                  {newMarkerPos && (
                    <Marker
                      position={[newMarkerPos.lat, newMarkerPos.lng]}
                      icon={stallIcon}
                    >
                      <Popup>
                        <div className="text-center">
                          <strong className="text-sm">New Position</strong>
                        </div>
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
              </CardContent>
            </Card>

            {/* Stall List / Controls */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  {isAdmin ? 'Admin Controls' : isStallOwner ? 'My Stalls' : 'Stalls'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="space-y-4 mb-4 pb-4 border-b">
                    <Button 
                      onClick={() => {
                        setAddingMarker(!addingMarker)
                        setNewMarkerPos(null)
                        setNewStallName("")
                        setNewStallLocation("")
                      }}
                      className="w-full"
                      variant={addingMarker ? "secondary" : "default"}
                    >
                      {addingMarker ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                      {addingMarker ? 'Cancel' : 'Add New Stall'}
                    </Button>
                    
                    {addingMarker && (
                      <div className="space-y-3">
                        <p className="text-xs text-muted-foreground">
                          Click on map to place marker
                        </p>
                        {newMarkerPos && (
                          <p className="text-xs text-green-600">✓ Location selected</p>
                        )}
                        <Input
                          placeholder="Stall name"
                          value={newStallName}
                          onChange={(e) => setNewStallName(e.target.value)}
                        />
                        <Input
                          placeholder="Stall location"
                          value={newStallLocation}
                          onChange={(e) => setNewStallLocation(e.target.value)}
                        />
                        <Button 
                          onClick={handleAddNewStall}
                          className="w-full"
                          disabled={!newMarkerPos || !newStallName || !newStallLocation}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Stall
                        </Button>
                      </div>
                    )}
                    
                    {!addingMarker && (
                      <p className="text-xs text-muted-foreground">
                        Drag markers to reposition them
                      </p>
                    )}
                  </div>
                )}

                {/* Stall Owner Controls */}
                {isStallOwner && (
                  <div className="space-y-4 mb-4 pb-4 border-b">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Place marker for your stall:
                      </label>
                      <select
                        className="w-full p-2 border rounded text-sm"
                        value={selectedMyStall || ''}
                        onChange={(e) => {
                          setSelectedMyStall(e.target.value)
                          setNewMarkerPos(null)
                        }}
                      >
                        <option value="">Choose a stall...</option>
                        {myStalls.map((stall) => (
                          <option key={stall._id} value={stall._id}>
                            {stall.stall_name} {stall.coordinates ? '✓' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {selectedMyStall && (
                      <div className="space-y-3">
                        <p className="text-xs text-muted-foreground">
                          Click on the map to set location
                        </p>
                        {newMarkerPos && (
                          <p className="text-xs text-green-600">✓ Location selected</p>
                        )}
                        <Button 
                          onClick={handleSaveStallLocation}
                          className="w-full"
                          disabled={!newMarkerPos}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Location
                        </Button>
                        <Button 
                          onClick={() => {
                            setSelectedMyStall(null)
                            setNewMarkerPos(null)
                          }}
                          className="w-full"
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Stall List */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {stalls.length > 0 ? (
                    stalls.map((stall) => (
                      <div
                        key={stall._id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedStall?._id === stall._id ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => setSelectedStall(stall)}
                      >
                        <h3 className="font-semibold text-sm mb-1">{stall.stall_name}</h3>
                        <div className="flex items-start gap-2 text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{stall.stall_location}</span>
                        </div>
                        {stall.offer && (
                          <div className="bg-green-50 border border-green-200 text-green-700 px-2 py-1 rounded text-xs">
                            {stall.offer}
                          </div>
                        )}
                        {stall.discount && (
                          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-2 py-1 rounded text-xs mt-1">
                            {stall.discount}% off
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Store className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No stalls found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Location Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All displayed stalls are located near <strong>BRAC University, Merul Badda, Dhaka, Bangladesh</strong>.
                Click on any marker to view stall details, or select a stall from the list to highlight it on the map.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
