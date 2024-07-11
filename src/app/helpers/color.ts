export default function color(energy: string): string {
  let color: string = ''
  if (energy === "Solar") color = "#CEA512"
  else if (energy === "Grid") color = "#1227E7"
  else if (energy === "Battery") color = "#2A9110"
  return color
}

export function colorZone(args: string): string {
  switch (args) {
    case "Low": return "#3C54BC";
    case "AVG Low": return "#38CD46";
    case "AVG": return "#C0BF10";
    case "AVG High": return "#D5822A";
    case "High": return "#D1432A"
  }
  return "black"
}
