module.exports = {
  // purge: {
  //   enabled: true,
  //   content: ["./dist/**/*.html", "./dist/assets/js/main.js"],
  // },
  theme: {
    debugScreens: {
      position: ["top", "right"],
    },
    container: {
      center: true,
    },
    fontSize: {
      xs: "1.2rem",
      md: "1.4rem",
      lg: "2rem",
      xlg: "2.2rem",
      xxlg: "2.5rem",
      16: "1.6rem",
      18: "1.8rem",
      30: "3rem",
    },
    extend: {
      colors: {
        como: "#4c8069",
        oldLace: "#fefbf2",
        vistaBlue: "#8ad7ac",
        plantation: "#284635",
        abbey: "#4b5254",
        boulder: "#777777",
        mineral: "#32503f",
        citrine: "#f9efd5",
        amber: "#FFC107",
        pearl: "#fcf3da",
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
      height: {
        70: "70vh",
        full: "100%",
      },
      width: {
        "fit-content": "fit-content",
      },
      transitionProperty: {
        background: "background-color",
        width: "width",
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
};
