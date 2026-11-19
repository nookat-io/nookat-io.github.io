/**
 * Sample data and state for the interactive app preview.
 *
 * Structure, labels and actions mirror the real Nookat UI (v0.1.8): the same
 * pages, table columns, filters and menu items. The values are illustrative
 * and the page labels the preview as sample data.
 */

export type View =
  "containers" | "images" | "volumes" | "networks" | "settings";

export type ContainerState = "running" | "paused" | "exited" | "restarting";

export type Container = {
  id: string;
  name: string;
  image: string;
  state: ContainerState;
  created: string;
  ports: string[];
  project?: string;
};

export type Image = {
  id: string;
  name: string;
  tag: string;
  created: string;
  size: string;
};

export type Volume = {
  name: string;
  driver: string;
  scope: "Local" | "Global";
  mount: string;
  usedBy: string[];
};

export type Network = {
  id: string;
  name: string;
  driver: string;
  created: string;
  subnet: string;
  gateway: string;
  system: boolean;
};

export type PreviewState = {
  containers: Container[];
  images: Image[];
  volumes: Volume[];
  networks: Network[];
  engineRunning: boolean;
};

export const initialState: PreviewState = {
  containers: [
    {
      id: "c-web",
      name: "storefront-web-1",
      image: "nginx:1.27-alpine",
      state: "running",
      created: "2 hours ago",
      ports: ["8080:80"],
      project: "storefront",
    },
    {
      id: "c-api",
      name: "storefront-api-1",
      image: "node:22-alpine",
      state: "running",
      created: "2 hours ago",
      ports: ["3000:3000"],
      project: "storefront",
    },
    {
      id: "c-db",
      name: "storefront-db-1",
      image: "postgres:16-alpine",
      state: "running",
      created: "2 hours ago",
      ports: ["5432:5432"],
      project: "storefront",
    },
    {
      id: "c-redis",
      name: "redis-cache",
      image: "redis:7-alpine",
      state: "running",
      created: "3 days ago",
      ports: ["6379:6379"],
    },
    {
      id: "c-mail",
      name: "mailpit",
      image: "axllent/mailpit:latest",
      state: "exited",
      created: "5 days ago",
      ports: [],
    },
  ],
  images: [
    {
      id: "i-pg",
      name: "postgres",
      tag: "16-alpine",
      created: "2 weeks ago",
      size: "262 MB",
    },
    {
      id: "i-node",
      name: "node",
      tag: "22-alpine",
      created: "3 weeks ago",
      size: "158 MB",
    },
    {
      id: "i-nginx",
      name: "nginx",
      tag: "1.27-alpine",
      created: "1 month ago",
      size: "50.1 MB",
    },
    {
      id: "i-redis",
      name: "redis",
      tag: "7-alpine",
      created: "1 month ago",
      size: "39.5 MB",
    },
    {
      id: "i-mail",
      name: "axllent/mailpit",
      tag: "latest",
      created: "1 month ago",
      size: "31.6 MB",
    },
    {
      id: "i-py",
      name: "python",
      tag: "3.12-slim",
      created: "2 months ago",
      size: "124 MB",
    },
    {
      id: "i-none",
      name: "<none>",
      tag: "<none>",
      created: "2 months ago",
      size: "1.08 GB",
    },
  ],
  volumes: [
    {
      name: "storefront_pgdata",
      driver: "local",
      scope: "Local",
      mount: "/var/lib/docker/volumes/storefront_pgdata/_data",
      usedBy: ["c-db"],
    },
    {
      name: "redis-data",
      driver: "local",
      scope: "Local",
      mount: "/var/lib/docker/volumes/redis-data/_data",
      usedBy: ["c-redis"],
    },
    {
      name: "mailpit-data",
      driver: "local",
      scope: "Local",
      mount: "/var/lib/docker/volumes/mailpit-data/_data",
      usedBy: ["c-mail"],
    },
    {
      name: "legacy_mysql_data",
      driver: "local",
      scope: "Local",
      mount: "/var/lib/docker/volumes/legacy_mysql_data/_data",
      usedBy: [],
    },
  ],
  networks: [
    {
      id: "n-bridge",
      name: "bridge",
      driver: "bridge",
      created: "3 weeks ago",
      subnet: "172.17.0.0/16",
      gateway: "172.17.0.1",
      system: true,
    },
    {
      id: "n-host",
      name: "host",
      driver: "host",
      created: "3 weeks ago",
      subnet: "-",
      gateway: "-",
      system: true,
    },
    {
      id: "n-none",
      name: "none",
      driver: "null",
      created: "3 weeks ago",
      subnet: "-",
      gateway: "-",
      system: true,
    },
    {
      id: "n-store",
      name: "storefront_default",
      driver: "bridge",
      created: "2 hours ago",
      subnet: "172.18.0.0/16",
      gateway: "172.18.0.1",
      system: false,
    },
  ],
  engineRunning: true,
};

/** Docker Hub search results shown in the preview's Pull Image dialog. */
export const HUB_RESULTS: {
  name: string;
  description: string;
  tag: string;
  size: string;
}[] = [
  {
    name: "alpine",
    description: "A minimal Docker image based on Alpine Linux",
    tag: "3.20",
    size: "7.8 MB",
  },
  {
    name: "ubuntu",
    description: "Ubuntu is a Debian-based Linux operating system",
    tag: "24.04",
    size: "78.1 MB",
  },
  {
    name: "postgres",
    description: "The PostgreSQL object-relational database system",
    tag: "17-alpine",
    size: "264 MB",
  },
  {
    name: "mysql",
    description: "MySQL is a widely used, open-source relational database",
    tag: "8.4",
    size: "586 MB",
  },
  {
    name: "mongo",
    description: "MongoDB document databases",
    tag: "8.0",
    size: "784 MB",
  },
  {
    name: "rabbitmq",
    description: "RabbitMQ is an open source multi-protocol messaging broker",
    tag: "4-management",
    size: "263 MB",
  },
  {
    name: "golang",
    description: "Go (golang) is a general purpose, higher-level language",
    tag: "1.23-alpine",
    size: "248 MB",
  },
  {
    name: "traefik",
    description: "Traefik, the cloud native edge router",
    tag: "v3.2",
    size: "182 MB",
  },
];

export const imageRef = (i: Image) => `${i.name}:${i.tag}`;

export const isDangling = (i: Image) => i.name === "<none>";

export const imageInUse = (i: Image, containers: Container[]) =>
  containers.some((c) => c.image === imageRef(i));

export const volumeInUse = (v: Volume, containers: Container[]) =>
  v.usedBy.some((id) => containers.some((c) => c.id === id));

export type Action =
  | { type: "containers/set"; ids: string[]; state: ContainerState }
  | { type: "containers/delete"; ids: string[] }
  | { type: "containers/prune" }
  | { type: "images/prune" }
  | { type: "images/delete"; ids: string[] }
  | { type: "images/pull"; image: Image }
  | { type: "volumes/prune" }
  | { type: "volumes/delete"; names: string[] }
  | { type: "networks/delete"; ids: string[] }
  | { type: "engine/set"; running: boolean }
  | { type: "reset" };

export function reducer(state: PreviewState, action: Action): PreviewState {
  switch (action.type) {
    case "containers/set":
      return {
        ...state,
        containers: state.containers.map((c) =>
          action.ids.includes(c.id) ? { ...c, state: action.state } : c,
        ),
      };
    case "containers/delete":
      return {
        ...state,
        containers: state.containers.filter((c) => !action.ids.includes(c.id)),
      };
    case "containers/prune":
      return {
        ...state,
        containers: state.containers.filter((c) => c.state !== "exited"),
      };
    case "images/prune":
      return {
        ...state,
        images: state.images.filter((i) => imageInUse(i, state.containers)),
      };
    case "images/delete":
      return {
        ...state,
        images: state.images.filter((i) => !action.ids.includes(i.id)),
      };
    case "images/pull":
      return state.images.some((i) => imageRef(i) === imageRef(action.image))
        ? state
        : { ...state, images: [action.image, ...state.images] };
    case "volumes/prune":
      return {
        ...state,
        volumes: state.volumes.filter((v) => volumeInUse(v, state.containers)),
      };
    case "volumes/delete":
      return {
        ...state,
        volumes: state.volumes.filter((v) => !action.names.includes(v.name)),
      };
    case "networks/delete":
      return {
        ...state,
        networks: state.networks.filter((n) => !action.ids.includes(n.id)),
      };
    case "engine/set":
      return { ...state, engineRunning: action.running };
    case "reset":
      return initialState;
  }
}

export const LOG_LINES: Record<string, string[]> = {
  "storefront-api-1": [
    "> storefront-api@2.4.0 start",
    "> node dist/server.js",
    "[info] connecting to postgres at storefront-db-1:5432",
    "[info] database ready, 14 migrations applied",
    "[info] redis connected at redis-cache:6379",
    "[info] listening on http://0.0.0.0:3000",
    "[http] GET /health 200 2ms",
    "[http] GET /api/products?page=1 200 18ms",
    "[http] POST /api/cart 201 9ms",
  ],
  "storefront-db-1": [
    "PostgreSQL init process complete; ready for start up.",
    "LOG:  starting PostgreSQL 16.4 on aarch64-unknown-linux-musl",
    'LOG:  listening on IPv4 address "0.0.0.0", port 5432',
    "LOG:  database system is ready to accept connections",
    "LOG:  checkpoint starting: time",
    "LOG:  checkpoint complete: wrote 42 buffers (0.3%)",
  ],
  "storefront-web-1": [
    "/docker-entrypoint.sh: Configuration complete; ready for start up",
    "nginx/1.27.2 start worker processes",
    '172.18.0.1 - - "GET / HTTP/1.1" 200 1342',
    '172.18.0.1 - - "GET /assets/app.js HTTP/1.1" 200 48211',
    '172.18.0.1 - - "GET /api/products HTTP/1.1" 200 5310',
  ],
  "redis-cache": [
    "Redis version=7.4.1, bits=64, commit=00000000, modified=0",
    "Server initialized",
    "Ready to accept connections tcp",
    "DB saved on disk",
  ],
  mailpit: [
    "[smtpd] starting on [::]:1025 (no encryption)",
    "[http] starting on [::]:8025",
    "[smtpd] received SIGTERM, shutting down",
  ],
};
