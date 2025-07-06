import React from "react";

// Regex for [text](url) links
const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
// Regex for **bold** or __bold__
const boldRegex = /\*\*([^*]+)\*\*|__([^_]+)__/g;
// Regex for bare URLs (http(s) or www. or domain.tld)
const urlRegex = /((https?:\/\/|www\.|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})([^\s]*))/g;

/**
 * Parses markdown text and returns an array of React elements.
 * Supports links, bold, and bare URLs.
 */
export function parseMarkdownToReact(text: string): React.ReactNode[] {
  // First, split by lines for paragraph/line breaks
  return text.split(/\n+/).map((line, i) => {
    let elements: (string | React.ReactNode)[] = [];
    let lastIndex = 0;

    // Parse [text](url) links
    line.replace(linkRegex, (match, text, url, offset) => {
      if (offset > lastIndex) elements.push(line.slice(lastIndex, offset));
      elements.push(
        React.createElement(
          "a",
          {
            key: offset,
            href: url.startsWith("http") ? url : `https://${url}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-blue-600 underline",
          },
          text
        )
      );
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < line.length) elements.push(line.slice(lastIndex));

    // Now, parse bold in each element
    elements = elements.flatMap((el) => {
      if (typeof el !== "string") return [el];
      const parts: (string | React.ReactNode)[] = [];
      let last = 0;

      el.replace(boldRegex, (match, bold1, bold2, offset) => {
        if (offset > last) parts.push(el.slice(last, offset));
        parts.push(
          React.createElement("strong", { key: "b" + offset }, bold1 || bold2)
        );
        last = offset + match.length;
        return match;
      });

      if (last < el.length) parts.push(el.slice(last));
      return parts;
    });

    // Finally, auto-link bare URLs
    elements = elements.flatMap((el) => {
      if (typeof el !== "string") return [el];
      const parts: (string | React.ReactNode)[] = [];
      let last = 0;

      el.replace(urlRegex, (match, url, _prefix, _rest, offset) => {
        if (offset > last) parts.push(el.slice(last, offset));
        let href = url;
        if (!href.startsWith("http")) href = "https://" + href;
        parts.push(
          React.createElement(
            "a",
            {
              key: "u" + offset,
              href: href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-blue-600 underline",
            },
            url
          )
        );
        last = offset + match.length;
        return match;
      });

      if (last < el.length) parts.push(el.slice(last));
      return parts;
    });

    return React.createElement("p", { key: i, className: "mb-2" }, ...elements);
  });
}
