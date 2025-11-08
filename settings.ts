import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import MermaidEnhancedPlugin from './main';

export class MermaidEnhancedSettingTab extends PluginSettingTab {
	plugin: MermaidEnhancedPlugin;

	constructor(app: App, plugin: MermaidEnhancedPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Mermaid Enhanced Settings' });

		new Setting(containerEl)
			.setName('Enable Template Library')
			.setDesc('Whether to enable the Mermaid chart template library function')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.templateLibrary)
				.onChange(async (value) => {
					this.plugin.settings.templateLibrary = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Quick Insert')
			.setDesc('Whether to enable the quick insert chart function')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.quickInsert)
				.onChange(async (value) => {
					this.plugin.settings.quickInsert = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Mermaid Theme')
			.setDesc('Select the theme style of the Mermaid')
			.addDropdown(dropdown => dropdown
				.addOption('default', 'Default')
				.addOption('dark', 'Dark')
				.addOption('forest', 'Forest')
				.addOption('neutral', 'Neutral')
				.setValue(this.plugin.settings.theme)
				.onChange(async (value) => {
					this.plugin.settings.theme = value;
					await this.plugin.saveSettings();
				}));
	}
}


