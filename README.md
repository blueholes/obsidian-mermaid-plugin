# Mermaid Enhanced - Obsidian Plugin

An enhanced Mermaid chart tool plugin that provides convenient Mermaid chart creation and editing features for Obsidian.

## Features

- 🎨 **Rich Template Library** - Built-in various commonly used chart templates (flowcharts, sequence diagrams, Gantt charts, class diagrams, etc.)
- ⚡ **Quick Insertion** - One-click insertion of commonly used chart templates
- ✏️ **Visual Editor** - Provides a code editor with real-time preview of Mermaid charts
- 🎯 **Command Palette Integration** - Quickly access all features through the command palette
- ⚙️ **Configurable Settings** - Customize themes and feature toggles

## Installation Method

### Manual Installation

1. Copy the entire plugin folder to the `.obsidian/plugins/` directory of your Obsidian vault
2. Open settings in Obsidian → Third-party plugins
3. Find "Mermaid Enhanced" and enable it

### Development Installation

1. Clone or download this repository
2. Run the following commands in the plugin directory:
   ```bash
   npm install
   npm run build
   ```
3. Copy the built files to the Obsidian plugin directory

## Usage

### Command Palette

Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac) to open the command palette, then type:

- **Insert Mermaid Chart** - Insert a basic Mermaid chart code block
- **Open Mermaid Template Library** - Browse and insert various chart templates
- **Open Mermaid Editor** - Use the visual editor to create and edit charts
- **Insert Flowchart Template** - Quickly insert a flowchart template
- **Insert Sequence Diagram Template** - Quickly insert a sequence diagram template
- **Insert Gantt Chart Template** - Quickly insert a Gantt chart template

### Template Library

1. Click the icon in the left sidebar or use the command palette to open the template library
2. Browse templates in different categories
3. Click the "Insert" button to insert the template at the current cursor position

### Editor

1. Use the command palette to open the Mermaid editor
2. Enter or modify Mermaid code in the editor
3. Click "Insert into Note" to insert the code into the current document

## Supported Chart Types

- Flowchart
- Sequence Diagram
- Gantt Chart
- Class Diagram
- State Diagram
- Pie Chart
- Entity Relationship Diagram
- User Journey
- Quadrant Chart

## Settings Options

In Obsidian settings, you can configure:

- **Enable Template Library** - Turn the template library feature on/off
- **Quick Insertion** - Turn the quick insertion feature on/off
- **Mermaid Theme** - Choose the theme style for charts (default, dark, forest, neutral)

## Development

### Project Structure

```
mermaid-enhanced/
├── main.ts              # Main plugin file
├── settings.ts          # Settings panel
├── templates.ts         # Template library
├── editor.ts            # Editor
├── styles.css           # Style file
├── manifest.json        # Plugin manifest
├── package.json         # Dependency configuration
└── tsconfig.json        # TypeScript configuration
```

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

## License

MIT License

## Contribution

Feel free to submit Issues and Pull Requests!

## Changelog

### 1.0.0
- Initial version released
- Supports template library feature
- Supports visual editor
- Supports quick insertion of commonly used charts