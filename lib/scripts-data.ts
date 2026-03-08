export interface GameScript {
  id: string
  name: string
  description: string
  category: "FPS" | "RPG" | "Simulator" | "Adventure" | "Obby" | "Horror" | "Other"
  features: string[]
  logoUrl: string
}

export const gameScripts: GameScript[] = [
  {
    id: "steal-brainrot",
    name: "Steal a Brainrot",
    description: "",
    category: "Adventure",
    features: ["Auto Steal", "Item ESP", "Speed Hack", "TELEPORT", "FLY"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-d3ad1abdc26ef3d577703f55bfe34450/150/150/Image/Webp/noFilter",
  },
  {
    id: "plants-vs-brainrots",
    name: "Escape Tsunami For Brainrots",
    description: "",
    category: "Other",
    features: ["Item Dupe", "Auto Farm & Auto Buy", "Auto-Attack", "Kill-Aura", "No Cooldown"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-63a9dbc67a5af8852833e3dce26593a1/150/150/Image/Webp/noFilter",
  },
  {
    id: "grow-garden",
    name: "RIVALS",
    description: "",
    category: "Simulator",
    features: ["Spawn Pets & Seeds", "Steal People Fruits", "Dupe Fruits", "Instant Grow", "Teleport"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-394d93fc6c4a842517b45806d715365c/150/150/Image/Webp/noFilter",
  },
  {
    id: "99-nights-forest",
    name: "99 Nights in the Forest",
    description: "",
    category: "Horror",
    features: ["Diamonds Finder", "Godmode", "Kill-Aura", "Auto Rescue Child", "FLY"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-1f742540cde76875d0e26f439f399358/150/150/Image/Webp/noFilter",
  },
   {
    id: "brookhaven",
    name: "Blox Fruits",
    description: "",
    category: "RPG",
    features: ["Teleport", "Speed Hack", "Godmode", "Item Spawn", "Fly"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-394d93fc6c4a842517b45806d715365c/150/150/Image/Webp/noFilter",
  },
]
