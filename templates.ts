import { App, Modal, Setting, MarkdownView, Notice } from 'obsidian';
import MermaidEnhancedPlugin from './main';

interface MermaidTemplate {
	name: string;
	description: string;
	code: string;
	category: string;
}

const TEMPLATES: MermaidTemplate[] = [
	{
		name: 'Flowchart',
		description: 'Flowchart templates',
		category: 'Flowchart',
		code: `---
title: A Flowchart
---
flowchart
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]`
	},
	{
		name: 'Sequence Diagram',
		description: 'Sequence Diagram templates',
		category: 'Sequence Diagram',
		code: `---
title: A Sequence Diagram
---
sequenceDiagram
    participant A as User
    participant B as System
    participant C as Database
    
    A->>B: Request
    B->>C: Query
    C-->>B: Result
    B-->>A: Response`
	},	{
		name: 'Mind Map',
		description: 'Mind Map templates',
		category: 'Mindmap',
		code: `---
title: "A Mind Map"
---
mindmap
    Root
        square[Square]
        rsquare(Rounded square)
        circle((Circle)) 
        cloud)Cloud(
        bang))Bang((
        hexagon{{Hexagon}}`
	},	{
		name: 'Gantt',
		description: 'Gantt Diagram templates',
		category: 'Gantt',
		code: `gantt
    title A Gantt Diagram
    dateFormat YYYY-MM-DD
    section Section
        A task          :a1, 2014-01-01, 30d
        Another task    :after a1, 20d
    section Another
        Task in Another :2014-01-12, 12d
        another task    :24d
`
	},	{
		name: 'Pie Chart',
		description: 'Pie Chart templates',
		category: 'Pie Chart',
		code: `---
title: "A Pie Chart"
config:
  pie:
    textPosition: 0.5
  themeVariables:
    pieOuterStrokeWidth: "5px"
---
pie showData
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5`
	},{
		name: 'ER Diagram',
		description: 'Entity Relationship Diagram templates',
		category: 'ER Diagram',
		code: `---
title: "Order example"
---
erDiagram
    
    "CUSTOMER" ||--o{ "ORDER" : "places"
    ORDER ||--|{ LINE-ITEM : contains
    "CUSTOMER" }|..|{ "DELIVERY-ADDRESS" : "uses"`
	},{
		name: 'Quadrant Chart(Chinese)',
		description: 'Quadrant Chart templates',
		category: 'Quadrant Chart',
		code: `---
title: "A Quadrant Chart"
config:
  quadrantChart:
    chartWidth: 400
    chartHeight: 400
  themeVariables:
    quadrant1TextFill: "ff0000"
---
quadrantChart
  x-axis Urgent --> Not Urgent
  y-axis Not Important --> "Important ❤"
  quadrant-1 Plan
  quadrant-2 Do
  quadrant-3 Delegate
  quadrant-4 Delete
`
	},	{
		name: 'Journey Diagram',
		description: 'Journey Diagram templates',
		category: 'Journey Diagram',
		code: `journey
    title User Journey
    section Look for Products
      Browse Products: 5: User
      Search for Products: 4: User
    section Decision
      View Details: 5: User
      Compare Prices: 4: User
    section Purchase
      Add to Cart: 5: User
      Checkout: 3: User`
	},	{
		name: 'StateDiagram',
		description: 'State Diagram templates',
		category: 'State Diagram',
		code: `---
title: "A State Diagram"
---
stateDiagram-v2
    state fork_state <<fork>>
      [*] --> fork_state
      fork_state --> State2
      fork_state --> State3

      state join_state <<join>>
      State2 --> join_state
      State3 --> join_state
      join_state --> State4
      State4 --> [*]`
	},	{
		name: 'Class diagram',
		description: 'UML Class Diagram templates',
		category: 'Class Diagram',
		code: `classDiagram
    class Animal {
        +String name
        +int age
        +eat()
        +sleep()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`
	}
];

export class MermaidTemplateModal extends Modal {
	plugin: MermaidEnhancedPlugin;
	selectedTemplate: MermaidTemplate | null = null;

	constructor(app: App, plugin: MermaidEnhancedPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();

		contentEl.createEl('h2', { text: 'Mermaid Templates' });

		// 按分类组织模板
		const categories = [...new Set(TEMPLATES.map(t => t.category))];
		
		categories.forEach(category => {
			const categoryEl = contentEl.createEl('div', { cls: 'mermaid-template-category' });
			categoryEl.createEl('h3', { text: category });

			const templatesInCategory = TEMPLATES.filter(t => t.category === category);
			
			templatesInCategory.forEach(template => {
				const templateEl = categoryEl.createEl('div', { cls: 'mermaid-template-item' });
				
				const header = templateEl.createEl('div', { cls: 'mermaid-template-header' });
				header.createEl('strong', { text: template.name });
				header.createEl('span', { text: template.description, cls: 'mermaid-template-desc' });
				
				const codePreview = templateEl.createEl('pre', { cls: 'mermaid-template-code' });
				codePreview.createEl('code', { text: template.code });

				new Setting(templateEl)
					.addButton(button => button
						.setButtonText('Insert')
						.setCta()
						.onClick(() => {
							this.insertTemplate(template);
						}));
			});
		});
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}

	insertTemplate(template: MermaidTemplate) {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView) {
			const editor = activeView.editor;
			const cursor = editor.getCursor();
			const mermaidBlock = `\`\`\`mermaid\n${template.code}\n\`\`\``;
			editor.replaceRange(mermaidBlock, cursor);
			editor.setCursor(cursor.line + template.code.split('\n').length + 1, 0);
			this.close();
			new Notice(`Inserted ${template.name} emplate`);
		}
	}
}

