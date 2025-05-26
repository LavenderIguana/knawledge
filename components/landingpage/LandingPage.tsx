import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, MessageSquare, FileText, Sparkles, Brain } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center relative">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-1/4 w-2 h-2 bg-black rounded-full"></div>
          <div className="absolute top-40 right-1/3 w-3 h-3 bg-gray-600 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-gray-400 rounded-full"></div>
          <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-black rounded-full"></div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Your Knowledge Base <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">Reimagined</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-10">
          Upload articles, get AI-powered summaries, chat with your content, and take smart notes with our AI-enhanced
          editor.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/summarize">
            <Button className="bg-black hover:bg-gray-800 text-white text-lg px-8 py-6">Try Knowledge Free</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Powerful Features for <span className="text-black font-bold">Knowledge Management</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white/80 p-8 rounded-xl border border-gray-300 shadow-sm">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <FileText className="h-7 w-7 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Article Upload</h3>
            <p className="text-gray-600">
              Easily upload and organize articles from various sources. Support for PDF, Word, and web links.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/80 p-8 rounded-xl border border-gray-300 shadow-sm">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="h-7 w-7 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Summarization</h3>
            <p className="text-gray-600">
              Get instant, accurate summaries of any article. Extract key points and insights in seconds.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/80 p-8 rounded-xl border border-gray-300 shadow-sm">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <MessageSquare className="h-7 w-7 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">Knowledge Chatbot</h3>
            <p className="text-gray-600">
              Ask questions about your articles and get instant, accurate answers based on your content.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white/80 p-8 rounded-xl border border-gray-300 shadow-sm">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Sparkles className="h-7 w-7 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Editor</h3>
            <p className="text-gray-600">
              Take notes with our Novel-inspired editor. Get AI assistance for writing, formatting, and organizing.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white/80 p-8 rounded-xl border border-gray-300 shadow-sm">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-7 w-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Search</h3>
            <p className="text-gray-600">
              Find exactly what you need with semantic search. Discover connections between different pieces of content.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white/80 p-8 rounded-xl border border-gray-300 shadow-sm">
            <div className="bg-gray-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-7 w-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Sharing</h3>
            <p className="text-gray-600">
              Share knowledge with your team securely. Control access and permissions for different users.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-20 bg-gradient-to-b from-gray-100 to-white">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          How <span className="text-black font-bold">Knowledge</span> Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mb-6 relative">
              <span className="text-2xl font-bold text-black">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Upload Content</h3>
            <p className="text-gray-600">Import articles, documents, and web pages into your knowledge base.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mb-6 relative">
              <span className="text-2xl font-bold text-black">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Organize & Summarize</h3>
            <p className="text-gray-600">
              Our AI automatically categorizes and summarizes your content for easy reference.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-black">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Search & Interact</h3>
            <p className="text-gray-600">Ask questions, take notes, and get insights from your knowledge base.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-gray-100 to-white rounded-2xl p-10 md:p-16 text-center max-w-5xl mx-auto border border-gray-300">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Knowledge Management?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Join thousands of professionals who use Knowledge to organize, summarize, and interact with their content.
          </p>
          <Link href="/summarize">
            <Button className="bg-black hover:bg-gray-800 text-white text-lg px-8 py-6">Get Started for Free</Button>
          </Link>
          <p className="text-gray-500 mt-4">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">Knowledge</span>
            </div>
            
            <div className="text-gray-400">
              <p>© {new Date().getFullYear()} Knowledge. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

