import { App, Modal, Editor, Notice } from 'obsidian';
import MermaidEnhancedPlugin from './main';

export class MermaidEditorModal extends Modal {
	plugin: MermaidEnhancedPlugin;
	editor: Editor;
	mermaidCode: string = 'graph TD\n    A[Start] --> B[End]';

	constructor(app: App, editor: Editor, plugin: MermaidEnhancedPlugin) {
		super(app);
		this.editor = editor;
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();

		contentEl.createEl('h2', { text: 'Mermaid Chart Editor' });

		// 创建编辑器区域
		const editorContainer = contentEl.createEl('div', { cls: 'mermaid-editor-container' });
		
		const editorLabel = editorContainer.createEl('label', { text: 'Mermaid Code:' });
		editorLabel.style.display = 'block';
		editorLabel.style.marginBottom = '10px';
		editorLabel.style.fontWeight = 'bold';

		const textArea = editorContainer.createEl('textarea', {
			cls: 'mermaid-editor-textarea',
			attr: {
				rows: '15',
				placeholder: 'Enter Mermaid code here...'
			}
		});
		textArea.value = this.mermaidCode;
		textArea.style.width = '100%';
		textArea.style.minHeight = '300px';
		textArea.style.fontFamily = 'monospace';
		textArea.style.padding = '10px';
		textArea.style.border = '1px solid var(--background-modifier-border)';
		textArea.style.borderRadius = '4px';
		textArea.style.backgroundColor = 'var(--background-primary)';
		textArea.style.color = 'var(--text-normal)';

		// 创建预览区域
		const previewContainer = contentEl.createEl('div', { cls: 'mermaid-preview-container' });
		previewContainer.createEl('h3', { text: 'Preview:' });
		
		const previewDiv = previewContainer.createEl('div', { cls: 'mermaid-preview' });
		previewDiv.style.minHeight = '200px';
		previewDiv.style.border = '1px solid var(--background-modifier-border)';
		previewDiv.style.borderRadius = '4px';
		previewDiv.style.padding = '20px';
		previewDiv.style.backgroundColor = 'var(--background-secondary)';
		previewDiv.style.textAlign = 'center';

		// 更新预览
		const updatePreview = () => {
			this.mermaidCode = textArea.value;
			previewDiv.innerHTML = `<pre class="mermaid">${this.mermaidCode}</pre>`;
			// 注意：实际的 Mermaid 渲染需要 Obsidian 的内置支持
			// 这里只是显示代码，实际渲染会在插入到笔记后由 Obsidian 处理
		};

		textArea.addEventListener('input', updatePreview);
		updatePreview();

		// 按钮区域
		const buttonContainer = contentEl.createEl('div', { cls: 'mermaid-editor-buttons' });
		buttonContainer.style.marginTop = '20px';
		buttonContainer.style.display = 'flex';
		buttonContainer.style.gap = '10px';
		buttonContainer.style.justifyContent = 'flex-end';

		const insertButton = buttonContainer.createEl('button', { text: 'Insert to Note' });
		insertButton.addClass('mod-cta');
		insertButton.onclick = () => {
			this.insertMermaidCode();
		};

		const cancelButton = buttonContainer.createEl('button', { text: 'Cancel' });
		cancelButton.onclick = () => {
			this.close();
		};
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}

	insertMermaidCode() {
		const cursor = this.editor.getCursor();
		const mermaidBlock = `\`\`\`mermaid\n${this.mermaidCode}\n\`\`\``;
		this.editor.replaceRange(mermaidBlock, cursor);
		const lineCount = this.mermaidCode.split('\n').length;
		this.editor.setCursor(cursor.line + lineCount + 1, 0);
		this.close();
		new Notice('Mermaid chart inserted');
	}
}

