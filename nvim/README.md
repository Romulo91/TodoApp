# 🏴‍☠️ Neovim Dashboard – One Piece / Straw Hat Theme

Ein cooler Neovim-Startbildschirm für **Romulo Galiao** mit One Piece / Strohhut-Motiv.

## Voraussetzungen

| Plugin | Link |
|--------|------|
| `alpha-nvim` | https://github.com/goolord/alpha-nvim |
| `telescope.nvim` | https://github.com/nvim-telescope/telescope.nvim |
| `lazy.nvim` | https://github.com/folke/lazy.nvim |

## Installation

1. Kopiere `lua/dashboard.lua` nach `~/.config/nvim/lua/dashboard.lua`
2. Füge in deiner `init.lua` folgendes ein:

```lua
require("dashboard")
```

3. Stelle sicher, dass `alpha-nvim` installiert ist (z. B. mit lazy.nvim):

```lua
{
  "goolord/alpha-nvim",
  dependencies = { "nvim-tree/nvim-web-devicons" },
  config = function()
    require("dashboard")
  end,
}
```

## Vorschau

```
          ██████╗  ██████╗ ███╗   ███╗██╗   ██╗██╗      ██████╗
          ██╔══██╗██╔═══██╗████╗ ████║██║   ██║██║     ██╔═══██╗
          ...

  ✦  Romulo Galiao  ✦   Welcome back, Captain!  ✦

  ┌─────────────────────────────────────────────────────────┐
  │   「 I WILL BECOME THE KING OF THE PIRATES! 」           │
  │              ~ Monkey D. Luffy ~                        │
  └─────────────────────────────────────────────────────────┘
```

## Farben

| Element  | Farbe          | Hex       |
|----------|----------------|-----------|
| Header   | One Piece Gold | `#e8a117` |
| Footer   | Strohhut Rot   | `#cc2222` |
