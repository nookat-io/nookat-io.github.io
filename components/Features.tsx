import { Container, HardDrive, Network, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Features() {
  return (
    <section id="features" className="section-padding bg-white dark:bg-slate-800/30">
      <div className="container-base max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Everything You Need</h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg max-w-2xl mx-auto">
            Manage containers, images, networks, and volumes with an intuitive interface that doesn't get in your way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-base">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Container className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">Container Management</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Start, stop, and monitor containers with real-time status updates and detailed logs.
              </p>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <HardDrive className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">Image & Volume Control</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Manage Docker images and persistent volumes with an intuitive file-based interface.
              </p>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Network className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">Network Management</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Create and manage Docker networks with port mapping visualization and configuration.
              </p>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">System Overview</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Monitor system resources and Docker daemon status with comprehensive system insights.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 