import { Plugin, MarkdownView, Editor, Notice } from 'obsidian';
import { MermaidEnhancedSettingTab } from './settings';
import { MermaidTemplateModal } from './templates';
import { MermaidEditorModal } from './editor';

interface MermaidEnhancedSettings {
	templateLibrary: boolean;
	quickInsert: boolean;
	theme: string;
}

const DEFAULT_SETTINGS: MermaidEnhancedSettings = {
	templateLibrary: true,
	quickInsert: true,
	theme: 'default'
}

export default class MermaidEnhancedPlugin extends Plugin {
	settings: MermaidEnhancedSettings;

	async onload() {
		await this.loadSettings();

		// 添加命令：插入 Mermaid 图表
		this.addCommand({
			id: 'insert-mermaid-diagram',
			name: 'Insert Mermaid Diagram',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.insertMermaidBlock(editor);
			}
		});

		// Add command: Open Mermaid Template Library
		this.addCommand({
			id: 'open-template-library',
			name: 'Open Mermaid Template Library',
			callback: () => {
				new MermaidTemplateModal(this.app, this).open();
			}
		});

		// Add command: Open Mermaid Editor
		this.addCommand({
			id: 'open-mermaid-editor',
			name: 'Open Mermaid Editor',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				new MermaidEditorModal(this.app, editor, this).open();
			}
		});

		// Add command: Insert Flowchart Template
		this.addCommand({
			id: 'insert-flowchart',
			name: 'Insert Flowchart Template',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.insertFlowchartTemplate(editor);
			}
		});

		// Add command: Insert Sequence Diagram Template
		this.addCommand({
			id: 'insert-sequence',
			name: 'Insert Sequence Diagram Template',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.insertSequenceTemplate(editor);
			}
		});

		// Add command: Insert Gantt Chart Template
		this.addCommand({
			id: 'insert-gantt',
			name: 'Insert Gantt Chart Template',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.insertGanttTemplate(editor);
			}
		});

		// Add setting tab
		this.addSettingTab(new MermaidEnhancedSettingTab(this.app, this));

		// Add shortcut hint
		this.addRibbonIcon('git-graph', 'Mermaid Enhanced', () => {
			new MermaidTemplateModal(this.app, this).open();
		});

		new Notice('Mermaid Enhanced plugin loaded!');
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	insertMermaidBlock(editor: Editor) {
		const cursor = editor.getCursor();
		const mermaidBlock = '```mermaid\ngraph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Operation]\n    B -->|No| D[End]\n    C --> D\n```';
		editor.replaceRange(mermaidBlock, cursor);
		editor.setCursor(cursor.line + 6, 0);
	}

	insertFlowchartTemplate(editor: Editor) {
		const cursor = editor.getCursor();
		const template = `\`\`\`mermaid
graph TD
    Start([Start]) --> Input[Input Data]
    Input --> Process{Process Data}
    Process -->|Success| Output[Output Result]
    Process -->|Failure| Error[Error Handling]
    Output --> End([End])
    Error --> End
\`\`\``;
		editor.replaceRange(template, cursor);
		editor.setCursor(cursor.line + 7, 0);
	}

	insertSequenceTemplate(editor: Editor) {
		const cursor = editor.getCursor();
		const template = `\`\`\`mermaid
sequenceDiagram
    participant A as User
    participant B as System
    participant C as Database
    
    A->>B: Request
    B->>C: Query
    C-->>B: Result
    B-->>A: Response
\`\`\``;
		editor.replaceRange(template, cursor);
		editor.setCursor(cursor.line + 8, 0);
	}

	insertGanttTemplate(editor: Editor) {
		const cursor = editor.getCursor();
		const template = `\`\`\`mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Section 1
    Task 1           :a1, 2024-01-01, 30d
    Task 2           :a2, after a1, 20d
    section Section 2
    Task 3           :a3, 2024-02-01, 30d
    Task 4           :a4, after a3, 25d
\`\`\``;
		editor.replaceRange(template, cursor);
		editor.setCursor(cursor.line + 9, 0);
	}
}


