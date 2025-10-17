import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactInfo() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-px bg-orange-500 mx-auto mb-4"></div>
          <p className="text-sm font-medium text-gray-600 tracking-wider mb-4">GET IN TOUCH</p>
          <h2 className="text-4xl font-serif text-gray-800 mb-6">Contact Information</h2>
          <p className="text-gray-600 max-w-md mx-auto">For any queries and issue contact us!</p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Write Us */}
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-2xl font-serif text-gray-800 mb-4">Write Us</h3>
            <div className="space-y-2 text-gray-600">
              <p>arhaannadaf13@gmail.com</p>
              <p>rihanshaikh206@gmail.com</p>
            </div>
          </div>

          {/* Call Us */}
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-2xl font-serif text-gray-800 mb-4">Call Us</h3>
            <div className="space-y-2 text-gray-600">
              <p>+91 8080376210</p>
              <p>+91 8530017493</p>
            </div>
          </div>

          {/* Visit Us */}
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-2xl font-serif text-gray-800 mb-4">Visit Us</h3>
            <div className="space-y-2 text-gray-600">
              <p>Ocean Pearl Goa, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
