import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle } from "lucide-react";

const ContactPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">Get in Touch</h1>
      <p className="text-center text-muted-foreground mb-12">Have a question or need help? We'd love to hear from you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-card border rounded-lg p-6 text-center">
          <Mail className="h-6 w-6 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-sm mb-1">Email Us</h3>
          <p className="text-sm text-muted-foreground">cosmicremediesbysia@gmail.com</p>
        </div>
        <div className="bg-card border rounded-lg p-6 text-center">
          <MessageCircle className="h-6 w-6 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-sm mb-1">Response Time</h3>
          <p className="text-sm text-muted-foreground">Usually within 24 hours</p>
        </div>
      </div>

      <form className="bg-card border rounded-xl p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Your name" />
          <Input placeholder="Your email" type="email" />
        </div>
        <Input placeholder="Subject" />
        <Textarea placeholder="Your message..." rows={5} />
        <Button type="submit" size="lg" className="w-full">Send Message</Button>
      </form>
    </div>
    <Footer />
  </div>
);

export default ContactPage;
