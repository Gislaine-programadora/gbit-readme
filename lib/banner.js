import figlet from "figlet";
import gradient from "gradient-string";

export default function banner() {
  console.log(
    gradient.pastel.multiline(
      figlet.textSync("GBIT README", {
        horizontalLayout: "default",
      })
    )
  );

  console.log(gradient.atlas("\nGera um README profissional automaticamente\n"));
}
