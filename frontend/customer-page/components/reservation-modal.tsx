"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { useState } from "react"

interface ReservationModalProps {
  isOpen: boolean
  onCloseAction: () => void
}

export default function ReservationModal({ isOpen, onCloseAction }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    person: "",
    day: "",
    date: "",
    time: "",
    message: "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Reservation submitted:", formData)
    onCloseAction()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-center flex-1">
              <div className="w-12 h-px bg-orange-500 mx-auto mb-4"></div>
              <h2 className="text-3xl font-serif text-gray-800">Table Reservation</h2>
            </div>
            <button onClick={onCloseAction} className="text-gray-500 hover:text-gray-700 text-2xl">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Select onValueChange={(value) => setFormData({ ...formData, person: value })}>
                  <SelectTrigger className="w-full p-4 border border-gray-200 rounded-lg">
                    <SelectValue placeholder="Person" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3">3 People</SelectItem>
                    <SelectItem value="4">4 People</SelectItem>
                    <SelectItem value="5">5 People</SelectItem>
                    <SelectItem value="6">6 People</SelectItem>
                    <SelectItem value="7">7 People</SelectItem>
                    <SelectItem value="8">8 People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
             

              <div>
                <Input
                  type="date"
                  placeholder="Date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
              
  {/* Day Selector */}
  <Select
    onValueChange={(value) => setFormData({ ...formData, day: value, time: "" })} required
  >
    <SelectTrigger className="w-full p-4 border border-gray-200 rounded-lg">
      <SelectValue placeholder="Select Day" />
    </SelectTrigger>
    <SelectContent className="w-full p-4 border border-gray-200 rounded-lg">
      <SelectItem value="Monday">Monday</SelectItem>
      <SelectItem value="Tuesday">Tuesday</SelectItem>
      <SelectItem value="Wednesday">Wednesday</SelectItem>
      <SelectItem value="Thursday">Thursday</SelectItem>
      <SelectItem value="Friday">Friday</SelectItem>
      <SelectItem value="Saturday">Saturday</SelectItem>
      <SelectItem value="Sunday">Sunday</SelectItem>
    </SelectContent>
  </Select>
  <div className="mt-4"> 
  {/* Time Selector */}
  <Select
    onValueChange={(value) => setFormData({ ...formData, time: value })}
    disabled={!formData.day}
   
  >
    <SelectTrigger className="w-full p-4 border border-gray-200 rounded-lg">
      <SelectValue placeholder="Select Time" />
    </SelectTrigger>
    <SelectContent>
      {["Monday", "Tuesday","Wednesday","Thursday","Friday"].includes(formData.day) && 
        [ "9:00 AM",  "9:30 AM","10:00 AM", "10:30 AM","11:00 AM", "11:30 AM","12:00 PM", "12:30 PM","1:00 PM",  "1:30 PM",
  "2:00 PM",  "2:30 PM","3:00 PM",  "3:30 PM","4:00 PM",  "4:30 PM","5:00 PM",  "5:30 PM","6:00 PM",  "6:30 PM","7:00 PM",  "7:30 PM","8:00 PM",  "8:30 PM",
  "9:00 PM",  "9:30 PM","10:00 PM"].map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      {["Saturday","Sunday"].includes(formData.day) &&
        [
  "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM",
  "1:00 PM",  "1:30 PM",
  "2:00 PM",  "2:30 PM",
  "3:00 PM",  "3:30 PM",
  "4:00 PM",  "4:30 PM",
  "5:00 PM",  "5:30 PM",
  "6:00 PM",  "6:30 PM",
  "7:00 PM",  "7:30 PM",
  "8:00 PM"].map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
    </SelectContent>
  </Select>

 </div>
</div>
             
            </div>

            {/* Message */}
            <div>
              <Textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-4 border border-gray-200 rounded-lg min-h-[120px] resize-none"
                rows={5}
              />
            </div>

            {/* Submit button */}
            <div className="text-center pt-4">
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-medium"
              >
                RESERVE A TABLE
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
