import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";

// Init msw
// initialize();
initialize();
//   {
//   onUnhandledRequest: ({ method, url }) => {
//     if (url.pathname.startsWith("/api")) {
//       console.error(`Unhandled ${method} request to ${url}.

//         This exception has been only logged in the console, however, it's strongly recommended to resolve this error as you don't want unmocked data in Storybook stories.

//         If you wish to mock an error response, please refer to this guide: https://mswjs.io/docs/recipes/mocking-error-responses
//       `);
//     }
//   },
// }

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    loaders: [mswLoader],
  },
};

export default preview;
