import { Container, HardDrive, Network, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Features() {
  return (
    <section
      id="features"
      className="section-padding bg-white dark:bg-slate-800/30"
    >
      <div className="container-base max-w-6xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Container Management
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              Without the Bloat
            </span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            All the essential container features you use daily, wrapped in a
            lightning-fast native interface. No unnecessary features, no
            resource hogging, just pure container management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="card-base group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/30 transition-colors">
                <Container className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">
                Container Management
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Start, stop, and monitor containers{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {" "}
                  10x faster
                </span>{" "}
                and with real-time status updates
              </p>
            </CardContent>
          </Card>

          <Card className="card-base group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/30 transition-colors">
                <HardDrive className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">
                Image & Volume Control
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Manage container images and persistent volumes with an intuitive
                file-based interface.
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {" "}
                  No more lost data
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="card-base group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/30 transition-colors">
                <Network className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">
                Network Management
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Create and manage container networks with port mapping
                visualization.
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  {" "}
                  Debug connections
                </span>{" "}
                instantly
              </p>
            </CardContent>
          </Card>

          <Card className="card-base group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/30 transition-colors">
                <Settings className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">
                System Overview
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Monitor system resources and container daemon status.
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  {" "}
                  Know what's running
                </span>{" "}
                at a glance
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
