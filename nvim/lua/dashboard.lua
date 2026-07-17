-- ============================================================
--  Neovim Dashboard  –  alpha-nvim  (One Piece / Straw Hat)
--  Copy this file to: ~/.config/nvim/lua/dashboard.lua
--  Then call require("dashboard") from your init.lua
-- ============================================================

local alpha = require("alpha")
local dashboard = require("alpha.themes.dashboard")

-- ── ASCII Art ───────────────────────────────────────────────
local header = {
  "",
  "",
  "          ██████╗  ██████╗ ███╗   ███╗██╗   ██╗██╗      ██████╗          ",
  "          ██╔══██╗██╔═══██╗████╗ ████║██║   ██║██║     ██╔═══██╗         ",
  "          ██████╔╝██║   ██║██╔████╔██║██║   ██║██║     ██║   ██║         ",
  "          ██╔══██╗██║   ██║██║╚██╔╝██║██║   ██║██║     ██║   ██║         ",
  "          ██║  ██║╚██████╔╝██║ ╚═╝ ██║╚██████╔╝███████╗╚██████╔╝         ",
  "          ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝          ",
  "",
  "        ██████╗  █████╗ ██╗      █████╗  ██████╗                          ",
  "        ██╔════╝ ██╔══██╗██║     ██╔══██╗██╔═══██╗                        ",
  "        ██║  ███╗███████║██║     ███████║██║   ██║                        ",
  "        ██║   ██║██╔══██║██║     ██╔══██║██║   ██║                        ",
  "        ╚██████╔╝██║  ██║███████╗██║  ██║╚██████╔╝                        ",
  "         ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝                        ",
  "",
  "  ┌─────────────────────────────────────────────────────────────────┐  ",
  "  │                                                                 │  ",
  "  │                     ~~~~~~~~   ~~~~~~~~                         │  ",
  "  │              __,,,_/ ------ \,/ ------ \___                    │  ",
  "  │            /`      (  straw  X  hat!!  )    `\\                 │  ",
  "  │           /    __   \______/   \______/  __   \\                │  ",
  "  │          |   /    \\   /~~\\   /~~\\   /    \\   |               │  ",
  "  │          |  |  ()  | |    | |    | |  ()  |  |               │  ",
  "  │           \\ |      | |    | |    | |      | //                │  ",
  "  │            \\|______|_|____|_|____|_|______| /                 │  ",
  "  │             \\________________________________/                 │  ",
  "  │                    ~~~ ~~~ ~~~ ~~~ ~~~                         │  ",
  "  │                                                                 │  ",
  "  │              ╔══════════════════════════════╗                  │  ",
  "  │              ║   「 I WILL BECOME THE        ║                  │  ",
  "  │              ║      KING OF THE PIRATES! 」  ║                  │  ",
  "  │              ╚══════════════════════════════╝                  │  ",
  "  │                          ~ Monkey D. Luffy ~                   │  ",
  "  │                                                                 │  ",
  "  └─────────────────────────────────────────────────────────────────┘  ",
  "",
  "              ✦  Romulo Galiao  ✦   Welcome back, Captain!  ✦           ",
  "",
}

-- ── Hat ASCII (compact, above buttons) ──────────────────────
local hat = {
  "                   .   .   .   .   .   .   .   .   .              ",
  "            .--------------------------------------------------.  ",
  "           /    _____________________________________    .       \\ ",
  "          /   /  .  .    S T R A W    H A T  .  .   \\    .      |",
  "         |   |    .  .  ~~~~~~~~~~~~~~~  .  .  .  .  |    .     |",
  "          \\   \\_____________________________________________/   . /",
  "           '--------------------------------------------------' .  ",
  "                   .   .   .   .   .   .   .   .   .              ",
}

-- Merge header + hat
local combined = {}
for _, v in ipairs(header) do table.insert(combined, v) end
for _, v in ipairs(hat) do table.insert(combined, v) end
table.insert(combined, "")

dashboard.section.header.val = combined

-- ── Highlight for the header ─────────────────────────────────
dashboard.section.header.opts.hl = "AlphaHeader"

-- ── Menu buttons ─────────────────────────────────────────────
dashboard.section.buttons.val = {
  dashboard.button("e",  "  New File",           ":ene <BAR> startinsert <CR>"),
  dashboard.button("f",  "  Find File",          ":Telescope find_files <CR>"),
  dashboard.button("r",  "  Recent Files",       ":Telescope oldfiles <CR>"),
  dashboard.button("g",  "  Live Grep",          ":Telescope live_grep <CR>"),
  dashboard.button("s",  "  Restore Session",    ":SessionRestore <CR>"),
  dashboard.button("l",  "  Lazy Plugin Manager",":Lazy <CR>"),
  dashboard.button("q",  "  Quit",               ":qa <CR>"),
}

-- ── Footer ───────────────────────────────────────────────────
local function footer()
  local stats = require("lazy").stats()
  local ms = (math.floor(stats.startuptime * 100 + 0.5) / 100)
  return "⚡ " .. stats.loaded .. "/" .. stats.count .. " plugins in " .. ms .. " ms  ·  🏴‍☠️  Set sail, Romulo!"
end

dashboard.section.footer.val = footer()
dashboard.section.footer.opts.hl = "AlphaFooter"

-- ── Layout ───────────────────────────────────────────────────
dashboard.config.layout = {
  { type = "padding", val = 1 },
  dashboard.section.header,
  { type = "padding", val = 2 },
  dashboard.section.buttons,
  { type = "padding", val = 1 },
  dashboard.section.footer,
}

alpha.setup(dashboard.config)

-- ── Colors (add to your colorscheme / highlights) ────────────
vim.api.nvim_set_hl(0, "AlphaHeader", { fg = "#e8a117" })   -- One Piece gold
vim.api.nvim_set_hl(0, "AlphaFooter", { fg = "#cc2222" })   -- Straw Hat red
