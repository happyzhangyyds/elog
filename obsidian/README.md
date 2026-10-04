# Obsidian 索引

请将**仓库根目录**作为 Obsidian Vault 打开，而不是单独打开此目录。

首次在本机配置：

```bash
git clone git@github.com:happyzhangyyds/elog.git
cd elog
./scripts/install-obsidian-hooks.sh
python3 scripts/build-obsidian-index.py
```

安装并启用 Obsidian Git 社区插件的自动拉取、自动备份/推送。编辑文章会通过 Git 回写 GitHub；提交前钩子会自动更新本索引。

当前索引：279 篇文章、22 个栏目、27 个标签；3 组重名标题已用完整路径消歧。
