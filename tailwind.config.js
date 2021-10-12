module.exports = {
  theme: {
    debugScreens: {
      position: ["top", "right"],
    },
    container: {
      center: true,
    },
    height: {
      70: "70vh",
      full: "100%",
    },
    fontSize: {
      xs: "1.2rem",
      md: "1.4rem",
      lg: "2rem",
      xlg: "2.2rem",
      xxlg: "2.5rem",
      30: "3rem",
      16: "1.6rem",
    },
    extend: {
      colors: {
        como: "#4c8069",
        oldLace: "#fefbf2",
        vistaBlue: "#8ad7ac",
        plantation: "#284635",
        abbey: "#4b5254",
        boulder: "#777777",
        test: "black",
      },
      fontFamily: {
        Futura: ["Futura"],
      },
      fill: {
        white: "white",
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  variants: {},
  plugins: [
    require("tailwindcss-debug-screens"),
    require("tailwindcss-logical"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "64rem",
          },
          "@screen md": {
            maxWidth: "76.8rem",
          },
          "@screen lg": {
            maxWidth: "102.4rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          },
          "@screen xl": {
            maxWidth: "111.5rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          },
        },
      });
    },
  ],
  // purge: {
  //   enabled: true,
  //   content: [
  //     './dist/**/*.html',
  //   ],
  // }
};
