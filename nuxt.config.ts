// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@bg-dev/nuxt-naiveui", "@pinia/nuxt"],
  runtimeConfig: {},
  ssr: false,
  app: {
    head: {
      script: [
        {
          src: "https://umami.magma.ink/script.js",
          async: true,
          "data-website-id": "0cfd0560-495e-4684-802e-f230747e2155",
        },
      ],
    },
  },
});
