#!/usr/bin/env python3
"""Generate tracked Obsidian index notes for this elog repository.

Open the repository root as the Obsidian vault.  Article Markdown remains in
content/posts; this command regenerates only the small `obsidian/` index tree.
It is safe to run after every git pull and before every git commit.
"""
from __future__ import annotations

import re
import shutil
import sys
from collections import Counter, defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
SOURCE = REPO / 'content' / 'posts'
OUTPUT = REPO / 'obsidian'
FRONTMATTER = re.compile(r'^---\s*\n(.*?)\n---\s*\n?', re.S)
FIELD = re.compile(r'^(title|date|category):\s*["\']?(.*?)["\']?\s*$', re.M)
TAGS = re.compile(r'^tags:\s*\n((?:^[ \t]+-.*\n?)*)', re.M)
INVALID_FILENAME = re.compile(r'[\\/:*?"<>|]')


def clean_filename(value: str) -> str:
    return INVALID_FILENAME.sub(' ', value).strip() or '未命名'


def parse_post(path: Path) -> dict:
    text = path.read_text(encoding='utf-8')
    result = {'title': path.stem, 'date': '', 'tags': []}
    match = FRONTMATTER.match(text)
    if not match:
        return result
    frontmatter = match.group(1)
    for key, value in FIELD.findall(frontmatter):
        if key in result:
            result[key] = value.strip().strip('"\'') or result[key]
    tag_match = TAGS.search(frontmatter)
    if tag_match:
        result['tags'] = [
            line.split('-', 1)[1].strip().strip('"\'')
            for line in tag_match.group(1).splitlines()
            if '-' in line and line.split('-', 1)[1].strip()
        ]
    return result


def wikilink(relative_note: Path, label: str | None = None) -> str:
    target = relative_note.with_suffix('').as_posix()
    return f'[[{target}|{label}]]' if label else f'[[{target}]]'


def write_moc(path: Path, title: str, lines: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text('\n'.join(['---', 'type: moc', 'generated: true', '---', '', f'# {title}', '', *lines, '']), encoding='utf-8')


def main() -> None:
    if not SOURCE.is_dir():
        raise SystemExit(f'Missing source directory: {SOURCE}')
    staging = REPO / '.obsidian-index-staging'
    if staging.exists():
        shutil.rmtree(staging)
    staging.mkdir()
    try:
        posts: list[dict] = []
        for source_note in sorted(SOURCE.rglob('*.md')):
            relative = source_note.relative_to(REPO)
            post = parse_post(source_note)
            post['relative_note'] = relative
            post['folder'] = relative.parts[2] if len(relative.parts) > 3 else '未分类'
            posts.append(post)

        by_folder: dict[str, list[dict]] = defaultdict(list)
        by_tag: dict[str, list[dict]] = defaultdict(list)
        by_year: dict[str, list[dict]] = defaultdict(list)
        for post in posts:
            by_folder[post['folder']].append(post)
            for tag in post['tags']:
                by_tag[tag].append(post)
            year = post['date'][:4] if re.fullmatch(r'\d{4}-\d{2}-\d{2}', post['date']) else '未标日期'
            by_year[year].append(post)

        folder_refs: list[tuple[str, int, Path]] = []
        for folder, items in sorted(by_folder.items()):
            relative_moc = Path('obsidian/索引/栏目') / f'{clean_filename(folder)}.md'
            lines = ['[[obsidian/索引/博客总览|博客总览]]', '', f'共 {len(items)} 篇。', '', '## 文章']
            lines += [f'- {wikilink(post["relative_note"], post["title"])}' for post in sorted(items, key=lambda p: (p['date'], p['title']), reverse=True)]
            write_moc(staging / relative_moc.relative_to('obsidian'), folder, lines)
            folder_refs.append((folder, len(items), relative_moc))

        tag_refs: list[tuple[str, int, Path]] = []
        for tag, items in sorted(by_tag.items(), key=lambda item: (-len(item[1]), item[0])):
            relative_moc = Path('obsidian/索引/标签') / f'{clean_filename(tag)}.md'
            lines = ['[[obsidian/索引/博客总览|博客总览]]', '', f'共 {len(items)} 篇。', '', '## 文章']
            lines += [f'- {wikilink(post["relative_note"], post["title"])}' for post in sorted(items, key=lambda p: (p['date'], p['title']), reverse=True)]
            write_moc(staging / relative_moc.relative_to('obsidian'), f'标签：{tag}', lines)
            tag_refs.append((tag, len(items), relative_moc))

        timeline = ['[[obsidian/索引/博客总览|博客总览]]']
        for year, items in sorted(by_year.items(), reverse=True):
            timeline += ['', f'## {year}']
            timeline += [f'- {wikilink(post["relative_note"], post["title"])} — {post["date"] or "日期未知"}' for post in sorted(items, key=lambda p: (p['date'], p['title']), reverse=True)]
        write_moc(staging / '索引/时间线.md', '时间线', timeline)

        overview = [
            '> 由 `scripts/build-obsidian-index.py` 自动生成；文章原文在 `content/posts/`。',
            '', f'共 **{len(posts)}** 篇文章、**{len(by_folder)}** 个栏目、**{len(by_tag)}** 个标签。',
            '', '## 按栏目',
        ]
        overview += [f'- {wikilink(relative_moc, name)} · {count} 篇' for name, count, relative_moc in folder_refs]
        overview += ['', '## 按标签（出现至少 2 次）']
        overview += [f'- {wikilink(relative_moc, name)} · {count} 篇' for name, count, relative_moc in tag_refs if count >= 2]
        overview += ['', f'- {wikilink(Path("obsidian/索引/时间线.md"), "时间线")}']
        write_moc(staging / '索引/博客总览.md', '博客总览', overview)

        duplicate_count = sum(count - 1 for count in Counter(post['title'] for post in posts).values() if count > 1)
        (staging / 'README.md').write_text(
            '\n'.join([
                '# Obsidian 索引', '',
                '请将**仓库根目录**作为 Obsidian Vault 打开，而不是单独打开此目录。',
                '', '首次在本机配置：', '', '```bash', 'git clone git@github.com:happyzhangyyds/elog.git', 'cd elog', './scripts/install-obsidian-hooks.sh', 'python3 scripts/build-obsidian-index.py', '```',
                '', '安装并启用 Obsidian Git 社区插件的自动拉取、自动备份/推送。编辑文章会通过 Git 回写 GitHub；提交前钩子会自动更新本索引。',
                '', f'当前索引：{len(posts)} 篇文章、{len(by_folder)} 个栏目、{len(by_tag)} 个标签；{duplicate_count} 组重名标题已用完整路径消歧。', '',
            ]), encoding='utf-8')

        if OUTPUT.exists():
            shutil.rmtree(OUTPUT)
        staging.rename(OUTPUT)
        print(f'generated={OUTPUT} posts={len(posts)} folders={len(by_folder)} tags={len(by_tag)}')
    except Exception:
        if staging.exists():
            shutil.rmtree(staging)
        raise


if __name__ == '__main__':
    main()
