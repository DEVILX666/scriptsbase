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
    id: "Murder Mystery 2",
    name: "Murder Mystery 2",
    description: "",
    category: "Simulator",
    features: ["Spawn Pets & Seeds", "Steal People Fruits", "Dupe Fruits", "Instant Grow", "Teleport"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-3ac5af325970a745b0156a5358174169/150/150/Image/Webp/noFilter",
  },
  {
    id: "adopt-me",
    name: "Adopt Me",
    description: "",
    category: "Other",
    features: ["Item Dupe", "Auto Farm & Auto Buy", "Auto-Attack", "Kill-Aura", "No Cooldown"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-0d49b813837768f23340dce01e129d9d/150/150/Image/Webp/noFilter",
  },
  {
    id: "throw-food-for-animals",
    name: "Throw Food For Animals",
    description: "",
    category: "Adventure",
    features: ["Auto Steal", "Item ESP", "Speed Hack", "TELEPORT", "FLY"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-ba6a8cb09b34cc51a3e13c9a99be8921/150/150/Image/Webp/noFilter",
  },
  {
    id: "steal-an-egg",
    name: "Steal An Egg",
    description: "",
    category: "Simulator",
    features: ["Spawn Pets & Seeds", "Steal People Fruits", "Dupe Fruits", "Instant Grow", "Teleport"],
    logoUrl: "https://tr.rbxcdn.com/180DAY-de1fa1528e87871c3acb258c9e70ef2f/150/150/Image/Webp/noFilter",
  },
]
