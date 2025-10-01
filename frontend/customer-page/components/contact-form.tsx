"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    // Handle form submission
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-px bg-orange-500 mx-auto mb-4"></div>
          <p className="text-sm font-medium text-gray-600 tracking-wider mb-4">CONTACT FORM</p>
          <h2 className="text-4xl font-serif text-gray-800 mb-6">Write Us a Message</h2>
          <p className="text-gray-600 max-w-md mx-auto">You can leave a message here!</p>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-lg text-lg"
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-lg text-lg"
                  required
                />
              </div>
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-lg text-lg"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-4 border border-gray-200 rounded-lg text-lg"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <Textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-4 border border-gray-200 rounded-lg min-h-[150px] resize-none text-lg"
                rows={6}
                required
              />
            </div>

            {/* Submit button */}
            <div className="text-center pt-6">
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-medium"
              >
                SEND A MESSAGE
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
