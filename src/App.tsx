import { SnippetEditor } from "@/components/snippet-editor";

export default function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Snippet Editor</h1>
        <p className="text-foreground/75 mb-6">
          Create message templates with variables like [User], [Subject], etc.
        </p>

        <SnippetEditor />
      </div>
    </div>
  );
}
