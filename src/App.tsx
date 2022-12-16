import { CollabKitProvider, CustomTheme } from "@collabkit/react";
import "@collabkit/react/dist/style.css";
import { Flow } from "./Flow";

const theme: CustomTheme = {
  color: {
    background: "hsl(0, 0%, 100%)",
    surface: "rgb(247 247 248)",
    surfaceOverlay: "rgba(0, 0, 0, 0.08)",
    textPrimary: "#071324",
    textSecondary: "#63676D",
    textDisabled: "rgb(99, 103, 109)",
    textLink: "#0180FE",
    border: "rgb(239, 240, 241)",
    icon: "rgb(162, 166, 172)",
    attention: "#0180FE",
  },
  inbox: {
    width: "320px",
    item: {
      borderBottom: "1px solid #EFF0F1",
      hover: {
        background: "#F7F7F8",
      },
    },
  },
};

export default () => (
  <CollabKitProvider
    appId="ADD APP ID HERE"
    apiKey="ADD API KEY HERE"
    workspace={{
      id: "demo",
      name: "Workspace",
    }}
    user={{
      id: "user-1",
      name: "Anonymous",
    }}
    theme={theme}
    mentionableUsers={"allWorkspace"}
  >
    <div style={{ width: "100vw", height: "100vh" }}>
      <Flow />
    </div>
  </CollabKitProvider>
);
