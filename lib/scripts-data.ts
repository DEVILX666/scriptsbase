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
    logoUrl: "https://tr.rbxcdn.com/180DAY-9d17eb0a6471422ac4b7fdec99823c4d/150/150/Image/Webp/noFilter",
  },
  {
    id: "plants-vs-brainrots",
    name: "Adopt Me",
    description: "",
    category: "Other",
    features: ["Item Dupe", "Auto Farm & Auto Buy", "Auto-Attack", "Kill-Aura", "No Cooldown"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-74346b0438e98de4cd5fb5c334093192/150/150/Image/Webp/noFilter",
  },
  {
    id: "brook-haven",
    name: "Brookhaven",
    description: "",
    category: "Simulator",
    features: ["Spawn Pets & Seeds", "Steal People Fruits", "Dupe Fruits", "Instant Grow", "Teleport"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-16fd036c37c35a5c51d26a6452a4ed42/150/150/Image/Webp/noFilter",
  },
  {
    id: "grow-garden",
    name: "Sailor Piece",
    description: "",
    category: "Simulator",
    features: ["Spawn Pets & Seeds", "Steal People Fruits", "Dupe Fruits", "Instant Grow", "Teleport"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-3a2733094a7ecefb5a8c14c282955beb/150/150/Image/Webp/noFilter",
  },
  {
    id: "brookhaven",
    name: "Blox Fruits",
    description: "",
    category: "RPG",
    features: ["Teleport", "Speed Hack", "Godmode", "Item Spawn", "Fly"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-90afa57850c8c8d1518b398b6c119ee9/150/150/Image/Webp/noFilter",
  }, 
]
