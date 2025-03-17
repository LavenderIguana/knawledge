import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, MessageSquare, FileText, Sparkles, Brain } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 text-white">
      {/* Navbar */}
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-purple-500" />
          <span className="text-2xl font-bold">Knowledge</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition">
            How It Works
          </a>
        </nav>
        <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center relative">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-1/4 w-2 h-2 bg-purple-500 rounded-full"></div>
          <div className="absolute top-40 right-1/3 w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-cyan-500 rounded-full"></div>
          <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Your Knowledge Base <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Reimagined</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mb-10">
          Upload articles, get AI-powered summaries, chat with your content, and take smart notes with our AI-enhanced
          editor.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">Try Knowledge Free</Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Powerful Features for <span className="text-purple-500">Knowledge Management</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
            <div className="bg-purple-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <FileText className="h-7 w-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Article Upload</h3>
            <p className="text-gray-300">
              Easily upload and organize articles from various sources. Support for PDF, Word, and web links.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
            <div className="bg-blue-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Summarization</h3>
            <p className="text-gray-300">
              Get instant, accurate summaries of any article. Extract key points and insights in seconds.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
            <div className="bg-cyan-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <MessageSquare className="h-7 w-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Knowledge Chatbot</h3>
            <p className="text-gray-300">
              Ask questions about your articles and get instant, accurate answers based on your content.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
            <div className="bg-emerald-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Sparkles className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Editor</h3>
            <p className="text-gray-300">
              Take notes with our Novel-inspired editor. Get AI assistance for writing, formatting, and organizing.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
            <div className="bg-pink-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-7 w-7 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Search</h3>
            <p className="text-gray-300">
              Find exactly what you need with semantic search. Discover connections between different pieces of content.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
            <div className="bg-amber-900/50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-7 w-7 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Sharing</h3>
            <p className="text-gray-300">
              Share knowledge with your team securely. Control access and permissions for different users.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-20 bg-gradient-to-b from-slate-900 to-black">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          How <span className="text-purple-500">Knowledge</span> Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 relative">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Upload Content</h3>
            <p className="text-gray-300">Import articles, documents, and web pages into your knowledge base.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 relative">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Organize & Summarize</h3>
            <p className="text-gray-300">
              Our AI automatically categorizes and summarizes your content for easy reference.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Search & Interact</h3>
            <p className="text-gray-300">Ask questions, take notes, and get insights from your knowledge base.</p>
          </div>
        </div>
      </section>

      {/* Showcase Section
      <section id="showcase" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          See <span className="text-purple-500">Knowledge</span> in Action
        </h2>

        <div className="bg-slate-800/30 rounded-2xl p-6 md:p-10 border border-slate-700 max-w-5xl mx-auto">
          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Knowledge App Demo"
              width={1280}
              height={720}
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-purple-700 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold mb-2">Article Summarization</h3>
              <p className="text-gray-300 text-sm">
                Watch how Knowledge instantly summarizes complex articles into digestible insights.
              </p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold mb-2">AI Chat Interface</h3>
              <p className="text-gray-300 text-sm">
                See how you can ask questions about your content and get accurate answers.
              </p>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold mb-2">Smart Note-Taking</h3>
              <p className="text-gray-300 text-sm">
                Experience our AI-powered editor that helps you organize and enhance your notes.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-10 md:p-16 text-center max-w-5xl mx-auto border border-purple-700/30">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Knowledge Management?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of professionals who use Knowledge to organize, summarize, and interact with their content.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">Get Started for Free</Button>
          <p className="text-gray-400 mt-4">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold">Knowledge</span>
            </div>
            
            <div className="text-gray-500">
              <p>© {new Date().getFullYear()} Knowledge. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

