import { initBotId } from "botid/client/core";

// Only the Contact Server Action is protected. Ordinary page GETs and the
// Cal.com booking flow (an embedded third-party iframe, not a route this
// app owns) are intentionally left alone.
initBotId({
  protect: [
    {
      path: "/contact",
      method: "POST",
    },
  ],
});
