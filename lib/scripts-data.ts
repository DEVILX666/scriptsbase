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
    id: "grow-a-garden-2",
    name: "Grow a Garden 2",
    description: "",
    category: "Simulator",
    features: ["Spawn Pets & Seeds", "Steal People Fruits", "Dupe Fruits", "Instant Grow", "Teleport"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-076fa0b396f5eac77ef9bb004dac1842/150/150/Image/Webp/noFilter",
  },
  {
    id: "Murder Mystery 2",
    name: "Murder Mystery 2",
    description: "",
    category: "Other",
    features: ["Item Dupe", "Auto Farm & Auto Buy", "Auto-Attack", "Kill-Aura", "No Cooldown"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-313f1416cd5e4335a97d054183743fdd/150/150/Image/Webp/noFilter",
  },
  {
    id: "steal-a-brainrot",
    name: "Steal a Brainrot",
    description: "",
    category: "Adventure",
    features: ["Auto Steal", "Item ESP", "Speed Hack", "TELEPORT", "FLY"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-ed33a138f484b844838da6c6ff062d51/150/150/Image/Webp/noFilter",
  },
  {
    id: "adopt-me",
    name: "Adopt Me",
    description: "",
    category: "Simulator",
    features: ["Spawn Pets & Seeds", "Steal People Fruits", "Dupe Fruits", "Instant Grow", "Teleport"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-eda3ccc488eabe19cc17f5caa711ac75/150/150/Image/Webp/noFilter",
  },
]
