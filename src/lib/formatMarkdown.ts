function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function markdownToHtml(text: string): string {
  return text
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_match, _lang, code: string) => {
      return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
    })
    .replace(/`([^`]+)`/g, (_match, code: string) => {
      return `<code>${escapeHtml(code)}</code>`;
    })
    .replace(/\*\*(.+?)\*\*/gs, "<b>$1</b>")
    .replace(/__(.+?)__/gs, "<b>$1</b>")
    .replace(/\*([^*\n]+)\*/g, "<i>$1</i>")
    .replace(/_([^_\n]+)_/g, "<i>$1</i>")
    .replace(/~~(.+?)~~/gs, "<s>$1</s>")
    .replace(/^#{1,6}\s+(.+)$/gm, "<b>$1</b>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^[-*]{3,}$/gm, "─────────────")
    .replace(/^>\s?(.+)$/gm, "<blockquote>$1</blockquote>");
}
