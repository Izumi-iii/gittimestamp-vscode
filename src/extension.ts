 import * as vscode from 'vscode';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

// 格式化日期的辅助函数
function fmtDate(date: Date, timezone: string, format: string): string {
	let targetDate = date;
	
	if (timezone === 'UTC') {
		targetDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
	}
	
	const year = targetDate.getFullYear();
	const month = String(targetDate.getMonth() + 1).padStart(2, '0');
	const day = String(targetDate.getDate()).padStart(2, '0');
	const hours = String(targetDate.getHours()).padStart(2, '0');
	const minutes = String(targetDate.getMinutes()).padStart(2, '0');
	const seconds = String(targetDate.getSeconds()).padStart(2, '0');
	
	return format
		.replace(/\${yyyy}/g, year.toString())
		.replace(/\${MM}/g, month)
		.replace(/\${dd}/g, day)
		.replace(/\${HH}/g, hours)
		.replace(/\${mm}/g, minutes)
		.replace(/\${ss}/g, seconds);
}

// 构建提交消息
async function buildMessage(): Promise<string> {
	const config = vscode.workspace.getConfiguration('smartCommit');
	const format = config.get<string>('format', '[${user}] - ${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}');
	const timezone = config.get<string>('timezone', 'local');
	
	// 获取Git用户名
	let username = 'Unknown';
	try {
		const { stdout } = await execFileAsync('git', ['config', 'user.name'], { cwd: vscode.workspace.workspaceFolders?.[0]?.uri.fsPath });
		username = stdout.trim();
	} catch (error) {
		// 如果Git用户名不存在，使用系统用户名
		try {
			const { stdout } = await execFileAsync('whoami', [], { cwd: vscode.workspace.workspaceFolders?.[0]?.uri.fsPath });
			username = stdout.trim();
		} catch (e) {
			username = 'User';
		}
	}
	
	const now = new Date();
	return fmtDate(now, timezone, format).replace(/\${user}/g, username);
}

// 检查是否是Git仓库
async function isGitRepository(): Promise<boolean> {
	try {
		await execFileAsync('git', ['rev-parse', '--git-dir'], { 
			cwd: vscode.workspace.workspaceFolders?.[0]?.uri.fsPath 
		});
		return true;
	} catch {
		return false;
	}
}

// 检查是否有变更
async function hasChanges(): Promise<boolean> {
	try {
		const { stdout } = await execFileAsync('git', ['status', '--porcelain'], { 
			cwd: vscode.workspace.workspaceFolders?.[0]?.uri.fsPath 
		});
		return stdout.trim().length > 0;
	} catch {
		return false;
	}
}

export function activate(context: vscode.ExtensionContext) {
	console.log('GitTimeStamp extension is now active!');

	// 预填充提交消息命令
	const prefillCommand = vscode.commands.registerCommand('smartCommit.prefill', async () => {
		try {
			// 检查是否是Git仓库
			if (!await isGitRepository()) {
				vscode.window.showErrorMessage('当前目录不是Git仓库');
				return;
			}

			// 检查是否有变更
			if (!await hasChanges()) {
				vscode.window.showInformationMessage('没有检测到变更，无需提交');
				return;
			}

			// 构建消息
			const message = await buildMessage();
			
			// 获取Git扩展API
			const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
			if (gitExtension) {
				const git = gitExtension.getAPI(1);
				const repo = git.repositories[0];
				if (repo) {
					repo.inputBox.value = message;
					vscode.window.showInformationMessage('已预填充提交消息');
				}
			} else {
				vscode.window.showErrorMessage('无法访问Git扩展');
			}
		} catch (error) {
			vscode.window.showErrorMessage(`预填充失败: ${error}`);
		}
	});

	// 一键提交命令
	const commitCommand = vscode.commands.registerCommand('smartCommit.commit', async () => {
		try {
			// 检查是否是Git仓库
			if (!await isGitRepository()) {
				vscode.window.showErrorMessage('当前目录不是Git仓库');
				return;
			}

			// 检查是否有变更
			if (!await hasChanges()) {
				vscode.window.showInformationMessage('没有检测到变更，无需提交');
				return;
			}

			// 获取工作目录
			const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
			if (!workspacePath) {
				vscode.window.showErrorMessage('无法获取工作目录');
				return;
			}
			
			// 验证工作目录是否是Git仓库
			try {
				await execFileAsync('git', ['rev-parse', '--git-dir'], { cwd: workspacePath });
			} catch (error) {
				vscode.window.showErrorMessage(`当前目录不是Git仓库: ${workspacePath}`);
				return;
			}

			// 获取配置
			const config = vscode.workspace.getConfiguration('smartCommit');
			const stageAll = config.get<boolean>('stageAllBeforeCommit', false);

			// 如果需要，先暂存所有文件
			if (stageAll) {
				console.log('暂存所有文件...');
				await execFileAsync('git', ['add', '.'], { 
					cwd: workspacePath 
				});
			}

			// 构建消息
			const message = await buildMessage();
			console.log('提交消息:', message);
			
			// 执行提交
			console.log('执行Git提交命令...');
			console.log('提交消息内容:', JSON.stringify(message));
			console.log('工作目录:', workspacePath);
			
			// 使用临时文件来避免命令行参数问题
			const tempFile = require('path').join(workspacePath, '.git-commit-msg.tmp');
			console.log('临时文件路径:', tempFile);
			
			try {
				require('fs').writeFileSync(tempFile, message, 'utf8');
				console.log('临时文件创建成功');
				
				// 验证文件是否存在
				if (!require('fs').existsSync(tempFile)) {
					throw new Error('临时文件创建失败');
				}
				
				const result = await execFileAsync('git', ['commit', '-F', tempFile], { 
					cwd: workspacePath,
					encoding: 'utf8',
					timeout: 10000
				});
				console.log('Git提交成功:', result);
			} catch (error) {
				console.error('提交过程中出错:', error);
				throw error;
			} finally {
				// 清理临时文件
				try {
					if (require('fs').existsSync(tempFile)) {
						require('fs').unlinkSync(tempFile);
						console.log('临时文件已清理');
					}
				} catch (e) {
					console.error('清理临时文件失败:', e);
				}
			}
			
			vscode.window.showInformationMessage('提交成功！');
		} catch (error) {
			console.error('提交失败详情:', error);
			vscode.window.showErrorMessage(`提交失败: ${error}`);
		}
	});

	context.subscriptions.push(prefillCommand, commitCommand);
}

export function deactivate() {}
