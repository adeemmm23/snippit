// import { SnippetEditor } from "@/components/snippet-editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Variables from "./components/variables";
import Editor from "./components/editor";
import { useState, useEffect } from "react";
import { Files } from "./components/files";

export default function App() {
  const [template, setTemplate] = useState(
    "Hello [User], we want to inform you about [Subject]. Your [Status] has been updated.",
  );
  const [variables, setVariables] = useState<Record<string, string>>({});

  // Extract variables from template
  useEffect(() => {
    const regex = /\[([^\]]+)\]/g;
    const matches = template.matchAll(regex);
    const foundVars = new Set<string>();

    for (const match of matches) {
      foundVars.add(match[1]);
    }

    // Initialize new variables with empty values
    const newVariables: Record<string, string> = {};
    foundVars.forEach((varName) => {
      newVariables[varName] = variables[varName] || "";
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVariables(newVariables);
  }, [template]);

  return (
    <div className="min-h-screen bg-background h-screen">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel
          defaultSize={300}
          minSize={200}
          className="p-4 rounded-md"
        >
          <Files data={IT_SUPPORT_SNIPPETS} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize="50%" className="px-8 py-4 rounded-md">
          <Editor
            template={template}
            setTemplate={setTemplate}
            variables={variables}
            setVariables={setVariables}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={300}
          minSize={200}
          className="p-4 rounded-md"
        >
          <Variables variables={variables} setVariables={setVariables} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

const IT_SUPPORT_SNIPPETS = {
  "Account Issues": {
    "Password Reset":
      "Hi [User],\n\nI've reset your password. Please check your email for the temporary password and update it upon first login.\n\nBest regards,\n[Agent]",
    "Account Locked":
      "Hello [User],\n\nYour account has been unlocked. You can now access the system using your existing credentials. If you continue to experience issues, please let me know.\n\nRegards,\n[Agent]",
    "New User Setup":
      "Hi [User],\n\nYour account has been created successfully. Login credentials:\nUsername: [Username]\nTemporary Password: [TempPassword]\n\nPlease change your password on first login.\n\nWelcome aboard!\n[Agent]",
  },
  "Hardware Issues": {
    "Laptop Request":
      "Hi [User],\n\nYour laptop request has been approved. Expected delivery: [Date]. You'll receive an email once it's ready for pickup.\n\nBest,\n[Agent]",
    "Printer Problems":
      "Hello [User],\n\nI've resolved the printer issue. The device is now online and ready to use. Please test and let me know if you encounter any problems.\n\nRegards,\n[Agent]",
    "Monitor Replacement":
      "Hi [User],\n\nA replacement monitor has been ordered. Expected arrival: [Date]. We'll schedule installation once it arrives.\n\nThank you,\n[Agent]",
  },
  "Software Access": {
    "License Activation":
      "Hello [User],\n\nYour [Software] license has been activated. Please restart the application to apply the changes.\n\nBest regards,\n[Agent]",
    "Software Installation":
      "Hi [User],\n\nI've installed [Software] on your system. The application is ready to use. Let me know if you need any assistance with setup.\n\nRegards,\n[Agent]",
    "Access Request Approved":
      "Hello [User],\n\nYour access request for [System] has been approved. You should now have the necessary permissions.\n\nBest,\n[Agent]",
  },
  "Network Issues": {
    "WiFi Troubleshooting":
      "Hi [User],\n\nI've refreshed your network connection. Please disconnect and reconnect to the WiFi. If the issue persists, restart your device.\n\nRegards,\n[Agent]",
    "VPN Setup":
      "Hello [User],\n\nYour VPN access has been configured. Please use the credentials sent to your email to connect.\n\nBest,\n[Agent]",
  },
  "General Support": {
    "Ticket Received":
      "Hi [User],\n\nThank you for contacting IT Support. Your ticket #[TicketNumber] has been received and is being reviewed. Expected response time: [Time].\n\nBest regards,\n[Agent]",
    "Issue Resolved":
      "Hello [User],\n\nYour issue has been resolved. Please verify that everything is working correctly and let us know if you need further assistance.\n\nBest,\n[Agent]",
    "Follow Up":
      "Hi [User],\n\nJust following up on ticket #[TicketNumber]. Has the issue been resolved to your satisfaction?\n\nPlease let me know if you need any further assistance.\n\nRegards,\n[Agent]",
  },
};
