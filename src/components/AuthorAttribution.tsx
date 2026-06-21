import { cn } from "@/lib/cn";

export function AuthorAttribution() {
  return (
    <p>
      Built by Ted Lorts ·{" "}
      <ExternalLink href="https://www.linkedin.com/in/ted-lorts-908a9584/">
        LinkedIn
      </ExternalLink>{" "}
      · <ExternalLink href="https://github.com/tplorts">GitHub</ExternalLink>
    </p>
  );
}

function ExternalLink({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "underline-offset-4 transition-colors hover:text-accent hover:underline",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
