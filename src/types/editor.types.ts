type Text = {
  type: "text";
  text: string;
};

type Variable = {
  type: "variable";
  text: string;
  variableName: string;
};

export type Part = Text | Variable;
